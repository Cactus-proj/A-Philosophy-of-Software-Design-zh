# Chapter 18 Code Should be Obvious

Obscurity is one of the two main causes of complexity described in Section 2.3. Obscurity occurs when important information about a system is not obvious to new developers. The solution to the obscurity problem is to write code in a way that makes it obvious; this chapter discusses some of the factors that make code more or less obvious.

If code is obvious, it means that someone can read the code quickly, without much thought, and their first guesses about the behavior or meaning of the code will be correct. If code is obvious, a reader doesn’t need to spend much time or effort to gather all the information they need to work with the code. If code is not obvious, then a reader must expend a lot of time and energy to understand it. Not only does this reduce their efficiency, but it also increases the likelihood of misunderstanding and bugs. Obvious code needs fewer comments than nonobvious code.

“Obvious” is in the mind of the reader: it’s easier to notice that someone else’s code is nonobvious than to see problems with your own code. Thus, the best way to determine the obviousness of code is through code reviews. If someone reading your code says it’s not obvious, then it’s not obvious, no matter how clear it may seem to you. By trying to understand what made the code nonobvious, you will learn how to write better code in the future.

## 18.1 Things that make code more obvious

Two of the most important techniques for making code obvious have already been discussed in previous chapters. The first is choosing good names (Chapter 14). Precise and meaningful names clarify the behavior of the code and reduce the need for documentation. If a name is vague or ambiguous, then readers will have read through the code in order to deduce the meaning of the named entity; this is time-consuming and error-prone. The second technique is consistency (Chapter 17). If similar things are always done in similar ways, then readers can recognize patterns they have seen before and immediately draw (safe) conclusions without analyzing the code in detail.

Here are a few other general-purpose techniques for making code more obvious:

Judicious use of white space. The way code is formatted can impact how easy it is to understand. Consider the following parameter documentation, in which whitespace has been squeezed out:

```java
/**
 *  ...
 *  @param numThreads The number of threads that this manager should
 *  spin up in order to manage ongoing connections. The MessageManager
 *  spins up at least one thread for every open connection, so this
 *  should be at least equal to the number of connections you expect
 *  to be open at once. This should be a multiple of that number if
 *  you expect to send a lot of messages in a short amount of time.
 *  @param handler Used as a callback in order to handle incoming
 *  messages on this MessageManager's open connections. See
 *  {@code MessageHandler} and {@code handleMessage} for details.
 */
```

It’s hard to see where the documentation for one parameter ends and the next begins. It’s not even obvious how many parameters there are, or what their names are. If a little whitespace is added, the structure suddenly becomes clear and the documentation is easier to scan:

```java
/**
 *  @param numThreads
 *           The number of threads that this manager should spin up in
 *           order to manage ongoing connections. The MessageManager spins
 *           up at least one thread for every open connection, so this
 *           should be at least equal to the number of connections you
 *           expect to be open at once. This should be a multiple of that
 *           number if you expect to send a lot of messages in a short
 *           amount of time.
 *  @param handler
 *           Used as a callback in order to handle incoming messages on
 *           this MessageManager's open connections. See
 *           {@code MessageHandler} and {@code handleMessage} for details.
 */
```

Blank lines are also useful to separate major blocks of code within a method, such as in the following example:

```cpp
void* Buffer::allocAux(size_t numBytes) {
    //  Round up the length to a multiple of 8 bytes, to ensure alignment.
    uint32_t numBytes32 =  (downCast<uint32_t>(numBytes) + 7) & ~0x7;
    assert(numBytes32 != 0);

    //  If there is enough memory at firstAvailable, use that. Work down
    //  from the top, because this memory is guaranteed to be aligned
    //  (memory at the bottom may have been used for variable-size chunks).
    if  (availableLength >= numBytes32) {
        availableLength -= numBytes32;
        return firstAvailable + availableLength;
    }

    //  Next, see if there is extra space at the end of the last chunk.
    if  (extraAppendBytes >= numBytes32) {
        extraAppendBytes -= numBytes32;
        return lastChunk->data + lastChunk->length + extraAppendBytes;
    }

    //  Must create a new space allocation; allocate space within it.
    uint32_t allocatedLength;
    firstAvailable = getNewAllocation(numBytes32, &allocatedLength);
    availableLength = allocatedLength numBytes32;
    return firstAvailable + availableLength;
}
```

This approach works particularly well if the first line after each blank line is a comment describing the next block of code: the blank lines make the comments more visible.

White space within a statement helps to clarify the structure of the statement. Compare the following two statements, one of which has whitespace and one of which doesn’t:

```java
for(int pass=1;pass>=0&&!empty;pass--) {

for (int pass = 1; pass >= 0 && !empty; pass--) {
```

Comments. Sometimes it isn’t possible to avoid code that is nonobvious. When this happens, it’s important to use comments to compensate by providing the missing information. To do this well, you must put yourself in the position of the reader and figure out what is likely to confuse them, and what information will clear up that confusion. The next section shows a few examples.

## 18.2 Things that make code less obvious

There are many things that can make code nonobvious; this section provides a few examples. Some of these, such as event-driven programming, are useful in some situations, so you may end up using them anyway. When this happens, extra documentation can help to minimize reader confusion.

Event-driven programming. In event-driven programming, an application responds to external occurrences, such as the arrival of a network packet or the press of a mouse button. One module is responsible for reporting incoming events. Other parts of the application register interest in certain events by asking the event module to invoke a given function or method when those events occur.

Event-driven programming makes it hard to follow the flow of control. The event handler functions are never invoked directly; they are invoked indirectly by the event module, typically using a function pointer or interface. Even if you find the point of invocation in the event module, it still isn’t possible to tell which specific function will be invoked: this will depend on which handlers were registered at runtime. Because of this, it’s hard to reason about event-driven code or convince yourself that it works.

To compensate for this obscurity, use the interface comment for each handler function to indicate when it is invoked, as in this example:

```java
/**
 * This method is invoked in the dispatch thread by a transport if a
 * transport-level error prevents an RPC from completing.
 */
void Transport::RpcNotifier::failed() {
    ...
}
```

img Red Flag: Nonobvious Code img

If the meaning and behavior of code cannot be understood with a quick reading, it is a red flag. Often this means that there is important information that is not immediately clear to someone reading the code.

Generic containers. Many languages provide generic classes for grouping two or more items into a single object, such as Pair in Java or std::pair in C++. These classes are tempting because they make it easy to pass around several objects with a single variable. One of the most common uses is to return multiple values from a method, as in this Java example:

```java
return new Pair<Integer, Boolean>(currentTerm, false);
```

Unfortunately, generic containers result in nonobvious code because the grouped elements have generic names that obscure their meaning. In the example above, the caller must reference the two returned values with result.getKey() and result.getValue(), which give no clue about the actual meaning of the values.

Thus, it’s better not to use generic containers. If you need a container, define a new class or structure that is specialized for the particular use. You can then use meaningful names for the elements, and you can provide additional documentation in the declaration, which is not possible with the generic container.

This example illustrates a general rule: software should be designed for ease of reading, not ease of writing. Generic containers are expedient for the person writing the code, but they create confusion for all the readers that follow. It’s better for the person writing the code to spend a few extra minutes to define a specific container structure, so that the resulting code is more obvious.

Different types for declaration and allocation. Consider the following Java example:

```java
private List<Message> incomingMessageList;
...
incomingMessageList = new ArrayList<Message>();
```

The variable is declared as a List, but the actual value is an ArrayList. This code is legal, since List is a superclass of ArrayList, but it can mislead a reader who sees the declaration but not the actual allocation. The actual type may impact how the variable is used (ArrayLists have different performance and thread-safety properties than other subclasses of List), so it is better to match the declaration with the allocation.

Code that violates reader expectations. Consider the following code, which is the main program for a Java application

```java
public static void main(String[] args) {
    ...
    new RaftClient(myAddress, serverAddresses);
}
```

Most applications exit when their main programs return, so readers are likely to assume that will happen here. However, that is not the case. The constructor for RaftClient creates additional threads, which continue to operate even though the application’s main thread finishes. This behavior should be documented in the interface comment for the RaftClient constructor, but the behavior is nonobvious enough that it’s worth putting a short comment at the end of main as well. The comment should indicate that the application will continue executing in other threads. Code is most obvious if it conforms to the conventions that readers will be expecting; if it doesn’t, then it’s important to document the behavior so readers aren’t confused.

## 18.3 Conclusion

Another way of thinking about obviousness is in terms of information. If code is nonobvious, that usually means there is important information about the code that the reader does not have: in the RaftClient example, the reader might not know that the RaftClient constructor created new threads; in the Pair example, the reader might not know that result.getKey() returns the number of the current term.

To make code obvious, you must ensure that readers always have the information they need to understand it. You can do this in three ways. The best way is to reduce the amount of information that is needed, using design techniques such as abstraction and eliminating special cases. Second, you can take advantage of information that readers have already acquired in other contexts (for example, by following conventions and conforming to expectations) so readers don’t have to learn new information for your code. Third, you can present the important information to them in the code, using techniques such as good names and strategic comments.
