# Chapter 13 Comments Should Describe Things that Aren’t Obvious from the Code

The reason for writing comments is that statements in a programming language can’t capture all of the important information that was in the mind of the developer when the code was written. Comments record this information so that developers who come along later can easily understand and modify the code. The guiding principle for comments is that comments should describe things that aren’t obvious from the code.

There are many things that aren’t obvious from the code. Sometimes it’s low-level details that aren’t obvious. For example, when a pair of indices describe a range, it isn’t obvious whether the elements given by the indices are inside the range or out. Sometimes it’s not clear why code is needed, or why it was implemented in a particular way. Sometimes there are rules the developer followed, such as “always invoke a before b.” You might be able to guess at a rule by looking at all of the code, but this is painful and error-prone; a comment can make the rule explicit and clear.

One of the most important reasons for comments is abstractions, which include a lot of information that isn’t obvious from the code. The idea of an abstraction is to provide a simple way of thinking about something, but code is so detailed that it can be hard to see the abstraction just from reading the code. Comments can provide a simpler, higher-level view (“after this method is invoked, network traffic will be limited to maxBandwidth bytes per second”). Even if this information can be deduced by reading the code, we don’t want to force users of a module to do that: reading the code is time-consuming and forces them to consider a lot of information that isn’t needed to use the module. Developers should be able to understand the abstraction provided by a module without reading any code other than its externally visible declarations. The only way to do this is by supplementing the declarations with comments.

This chapter discusses what information needs to be described in comments and how to write good comments. As you will see, good comments typically explain things at a different level of detail than the code, which is more detailed in some situations and less detailed (more abstract) in others.

## 13.1 Pick conventions

The first step in writing comments is to decide on conventions for commenting, such as what you will comment and the format you will use for comments. If you are programming in a language for which there exists a document compilation tool, such as Javadoc for Java, Doxygen for C++, or godoc for Go!, follow the conventions of the tools. None of these conventions is perfect, but the tools provide enough benefits to make up for that. If you are programming in an environment where there are no existing conventions to follow, try to adopt the conventions from some other language or project that is similar; this will make it easier for other developers to understand and adhere to your conventions.

Conventions serve two purposes. First, they ensure consistency, which makes comments easier to read and understand. Second, they help to ensure that you actually write comments. If you don’t have a clear idea what you are going to comment and how, it’s easy to end up writing no comments at all.

Most comments fall into one of the following categories:

Interface: a comment block that immediately precedes the declaration of a module such as a class, data structure, function, or method. The comment describe’s the module’s interface. For a class, the comment describes the overall abstraction provided by the class. For a method or function, the comment describes its overall behavior, its arguments and return value, if any, any side effects or exceptions that it generates, and any other requirements the caller must satisfy before invoking the method.

Data structure member: a comment next to the declaration of a field in a data structure, such as an instance variable or static variable for a class.

Implementation comment: a comment inside the code of a method or function, which describes how the code works internally.

Cross-module comment: a comment describing dependencies that cross module boundaries.

The most important comments are those in the first two categories. Every class should have an interface comment, every class variable should have a comment, and every method should have an interface comment. Occasionally, the declaration for a variable or method is so obvious that there is nothing useful to add in a comment (getters and setters sometimes fall in this category), but this is rare; it is easier to comment everything rather than spend energy worrying about whether a comment is needed. Implementation comments are often unnecessary (see Section 13.6 below). Cross-module comments are the most rare of all and they are problematic to write, but when they are needed they are quite important; Section 13.7 discusses them in more detail.

## 13.2 Don’t repeat the code

Unfortunately, many comments are not particularly helpful. The most common reason is that the comments repeat the code: all of the information in the comment can easily be deduced from the code next to the comment. Here is a code sample that appeared in a recent research paper:

```sh
ptr_copy = get_copy(obj)            # Get pointer copy
if is_unlocked(ptr_copy):           # Is obj free?
    return obj                      # return current obj
if is_copy(ptr_copy):               # Already a copy?
    return obj                      # return obj
thread_id = get_thread_id(ptr_copy)
if thread_id == ctx.thread_id:      # Locked by current ctx
    return ptr_copy                 # Return copy
```

There is no useful information in any of these comments except for the “Locked by” comment, which suggests something about the thread that might not be obvious from the code. Notice that these comments are at roughly the same level of detail as the code: there is one comment per line of code, which describes that line. Comments like this are rarely useful.

Here are more examples of comments that repeat the code:

```java
// Add a horizontal scroll bar
hScrollBar = new JScrollBar(JScrollBar.HORIZONTAL);
add(hScrollBar, BorderLayout.SOUTH);

// Add a vertical scroll bar
vScrollBar = new JScrollBar(JScrollBar.VERTICAL);
add(vScrollBar, BorderLayout.EAST);

// Initialize the caret-position related values
caretX     = 0;
caretY     = 0;
caretMemX  = null;
```

None of these comments provide any value. For the first two comments, the code is already clear enough that it doesn’t really need comments; in the third case, a comment might be useful, but the current comment doesn’t provide enough detail to be helpful.

After you have written a comment, ask yourself the following question: could someone who has never seen the code write the comment just by looking at the code next to the comment? If the answer is yes, as in the examples above, then the comment doesn’t make the code any easier to understand. Comments like these are why some people think that comments are worthless.

Another common mistake is to use the same words in the comment that appear in the name of the entity being documented:

```java
/*
 * Obtain a normalized resource name from REQ.
 */
private static String[] getNormalizedResourceNames(
            HTTPRequest req) ...
/*
 * Downcast PARAMETER to TYPE.
 */
private static Object downCastParameter(String parameter, String type) ...
/*
 * The horizontal padding of each line in the text.
 */
private static final int textHorizontalPadding = 4;
```

These comments just take the words from the method or variable name, perhaps add a few words from argument names and types, and form them into a sentence. For example, the only thing in the second comment that isn’t in the code is the word “to”! Once again, these comments could be written just by looking at the declarations, without any understanding the methods of variables; as a result, they have no value.

img Red Flag: Comment Repeats Code img

If the information in a comment is already obvious from the code next to the comment, then the comment isn’t helpful. One example of this is when the comment uses the same words that make up the name of the thing it is describing.

At the same time, there is important information that is missing from the comments: for example, what is a “normalized resource name”, and what are the elements of the array returned by getNormalizedResourceNames? What does “downcast” mean? What are the units of padding, and is the padding on one side of each line or both? Describing these things in comments would be helpful.

A first step towards writing good comments is to use different words in the comment from those in the name of the entity being described. Pick words for the comment that provide additional information about the meaning of the entity, rather than just repeating its name. For example, here is a better comment for textHorizontalPadding:

```java
/*
 * The amount of blank space to leave on the left and
 * right sides of each line of text, in pixels.
 */
private static final int textHorizontalPadding = 4;
```

This comment provides additional information that is not obvious from the declaration itself, such as the units (pixels) and the fact that padding applies to both sides of each line. Instead of using the term “padding”, the comment explains what padding is, in case the reader isn’t already familiar with the term.

## 13.3 Lower-level comments add precision

Now that you know what not to do, let’s discuss what information you should put in comments. Comments augment the code by providing information at a different level of detail. Some comments provide information at a lower, more detailed, level than the code; these comments add precision by clarifying the exact meaning of the code. Other comments provide information at a higher, more abstract, level than the code; these comments offer intuition, such as the reasoning behind the code, or a simpler and more abstract way of thinking about the code. Comments at the same level as the code are likely to repeat the code. This section discusses the lower-level approach in more detail, and the next section discusses the higher-level approach.

Precision is most useful when commenting variable declarations such as class instance variables, method arguments, and return values. The name and type in a variable declaration are typically not very precise. Comments can fill in missing details such as:

- What are the units for this variable?
- Are the boundary conditions inclusive or exclusive?
- If a null value is permitted, what does it imply?
- If a variable refers to a resource that must eventually be freed or closed, who is responsible for freeing or closing it?
- Are there certain properties that are always true for the variable (invariants), such as “this list always contains at least one entry”?

---

Some of this information could potentially be figured out by examining all of the code where the variable is used. However, this is time-consuming and error-prone; the declaration’s comment should be clear and complete enough to make this unnecessary. When I say that the comment for a declaration should describe things that aren’t obvious from the code, “the code” refers to the code next to the comment (the declaration), not “all of the code in the application.”

The most common problem with comments for variables is that the comments are too vague. Here are two examples of comments that aren’t precise enough:

```java
// Current offset in resp Buffer
uint32_t offset;

// Contains all line-widths inside the document and
// number of appearances.
private TreeMap<Integer, Integer> lineWidths;
```

In the first example, it’s not clear what “current” means. In the second example, it’s not clear that the keys in the TreeMap are line widths and values are occurrence counts. Also, are widths measured in pixels or characters? The revised comments below provide additional details:

```java
//  Position in this buffer of the first object that hasn't
//  been returned to the client.
uint32_t offset;

//  Holds statistics about line lengths of the form <length, count>
//  where length is the number of characters in a line (including
//  the newline), and count is the number of lines with
//  exactly that many characters. If there are no lines with
//  a particular length, then there is no entry for that length.
private TreeMap<Integer, Integer> numLinesWithLength;
```

The second declaration uses a longer name that conveys more information. It also changes “width” to “length”, because this term is more likely to make people think that the units are characters rather than pixels. Notice that the second comment documents not only the details of each entry, but also what it means if an entry is missing.

When documenting a variable, think nouns, not verbs. In other words, focus on what the variable represents, not how it is manipulated. Consider the following comment:

```java
/* FOLLOWER VARIABLE: indicator variable that allows the Receiver and the
 * PeriodicTasks thread to communicate about whether a heartbeat has been
 * received within the follower's election timeout window.
 * Toggled to TRUE when a valid heartbeat is received.
 * Toggled to FALSE when the election timeout window is reset.  */
private boolean receivedValidHeartbeat;
```

This documentation describes how the variable is modified by several pieces of code in the class. The comment will be both shorter and more useful if it describes what the variable represents rather than mirroring the code structure:

```java
/* True means that a heartbeat has been received since the last time
 * the election timer was reset. Used for communication between the
 * Receiver and PeriodicTasks threads.  */
private boolean receivedValidHeartbeat;
```

Given this documentation, it’s easy to infer that the variable must be set to true when a heartbeat is received and false when the election timer is reset.

## 13.4 Higher-level comments enhance intuition

The second way in which comments can augment code is by providing intuition. These comments are written at a higher level than the code. They omit details and help the reader to understand the overall intent and structure of the code. This approach is commonly used for comments inside methods, and for interface comments. For example, consider the following code:

```java
// If there is a LOADING readRpc using the same session
// as PKHash pointed to by assignPos, and the last PKHash
// in that readRPC is smaller than current assigning
// PKHash, then we put assigning PKHash into that readRPC.
int readActiveRpcId = RPC_ID_NOT_ASSIGNED;
for (int i = 0; i < NUM_READ_RPC; i++) {
    if (session == readRpc[i].session
            && readRpc[i].status == LOADING
            && readRpc[i].maxPos < assignPos
            && readRpc[i].numHashes < MAX_PKHASHES_PERRPC) {
        readActiveRpcId = i;
        break;
    }
}
```

The comment is too low-level and detailed. On the one hand, it partially repeats the code: “if there is a LOADING readRPC” just duplicates the test `readRpc[i].status == LOADING`. On the other hand, the comment doesn’t explain the overall purpose of this code, or how it fits into the method that contains it. As a result, the comment doesn’t help the reader to understand the code.

Here is a better comment:

```java
// Try to append the current key hash onto an existing
// RPC to the desired server that hasn't been sent yet.
```

This comment doesn’t contain any details; instead, it describes the code’s overall function at a higher level. With this high-level information, a reader can explain almost everything that happens in the code: the loop must be iterating over all the existing remote procedure calls (RPCs); the session test is probably used to see if a particular RPC is destined for the right server; the LOADING test suggests that RPCs can have multiple states, and in some states it isn’t safe to add more hashes; the MAX - PKHASHES_PERRPC test suggests that there is a limit to how many hashes can be sent in a single RPC. The only thing not explained by the comment is the maxPos test. Furthermore, the new comment provides a basis for readers to judge the code: does it do everything that is needed to add the key hash to an existing RPC? The original comment didn’t describe the overall intent of the code, so it’s hard for a reader to decide whether the code is behaving correctly.

Higher-level comments are more difficult to write than lower-level comments because you must think about the code in a different way. Ask yourself: What is this code trying to do? What is the simplest thing you can say that explains everything in the code? What is the most important thing about this code?

Engineers tend to be very detail-oriented. We love details and are good at managing lots of them; this is essential for being a good engineer. But, great software designers can also step back from the details and think about a system at a higher level. This means deciding which aspects of the system are most important, and being able to ignore the low-level details and think about the system only in terms of its most fundamental characteristics. This is the essence of abstraction (finding a simple way to think about a complex entity), and it’s also what you must do when writing higher-level comments. A good higher-level comment expresses one or a few simple ideas that provide a conceptual framework, such as “append to an existing RPC.” Given the framework, it becomes easy to see how specific code statements relate to the overall goal.

Here is another code sample, which has a good higher-level comment:

```java
if (numProcessedPKHashes < readRpc[i].numHashes) {
    // Some of the key hashes couldn't be looked up in
    // this request (either because they aren't stored
    // on the server, the server crashed, or there
    // wasn't enough space in the response message).
    // Mark the unprocessed hashes so they will get
    // reassigned to new RPCs.
    for (size_t p = removePos; p < insertPos; p++) {
        if (activeRpcId[p] == i) {
            if (numProcessedPKHashes > 0) {
                numProcessedPKHashes--;
            } else {
                if (p < assignPos)
                    assignPos = p;
                activeRpcId[p] = RPC_ID_NOT_ASSIGNED;
            }
        }
    }
}
```

This comment does two things. The second sentence provides an abstract description of what the code does. The first sentence is different: it explains (in high level terms) why the code is executed. Comments of the form “how we get here” are very useful for helping people to understand code. For example, when documenting a method, it can be very helpful to describe the conditions under which the method is most likely to be invoked (especially if the method is only invoked in unusual situations).

## 13.5 Interface documentation

One of the most important roles for comments is to define abstractions. Recall from Chapter 4 that an abstraction is a simplified view of an entity, which preserves essential information but omits details that can safely be ignored. Code isn’t suitable for describing abstractions; it’s too low level and it includes implementation details that shouldn’t be visible in the abstraction. The only way to describe an abstraction is with comments. If you want code that presents good abstractions, you must document those abstractions with comments.

The first step in documenting abstractions is to separate interface comments from implementation comments. Interface comments provide information that someone needs to know in order to use a class or method; they define the abstraction. Implementation comments describe how a class or method works internally in order to implement the abstraction. It’s important to separate these two kinds of comments, so that users of an interface are not exposed to implementation details. Furthermore, these two forms had better be different. If interface comments must also describe the implementation, then the class or method is shallow. This means that the act of writing comments can provide clues about the quality of a design; Chapter 15 will return to this idea.

The interface comment for a class provides a high-level description of the abstraction provided by the class, such as the following:

```java
/**
 * This class implements a simple server-side interface to the HTTP
 * protocol: by using this class, an application can receive HTTP
 * requests, process them, and return responses. Each instance of
 * this class corresponds to a particular socket used to receive
 * requests. The current implementation is single-threaded and
 * processes one request at a time.
 */
public class Http {...}
```

This comment describes the overall capabilities of the class, without any implementation details or even the specifics of particular methods. It also describes what each instance of the class represents. Finally, the comments describe the limitations of the class (it does not support concurrent access from multiple threads), which may be important to developers contemplating whether to use it.

The interface comment for a method includes both higher-level information for abstraction and lower-level details for precision:

- The comment usually starts with a sentence or two describing the behavior of the method as perceived by callers; this is the higher-level abstraction.
- The comment must describe each argument and the return value (if any). These comments must be very precise, and must describe any constraints on argument values as well as dependencies between arguments.
- If the method has any side effects, these must be documented in the interface comment. A side effect is any consequence of the method that affects the future behavior of the system but is not part of the result. For example, if the method adds a value to an internal data structure, which can be retrieved by future method calls, this is a side effect; writing to the file system is also a side effect.
- A method’s interface comment must describe any exceptions that can emanate from the method.
- If there are any preconditions that must be satisfied before a method is invoked, these must be described (perhaps some other method must be invoked first; for a binary search method, the list being searched must be sorted). It is a good idea to minimize preconditions, but any that remain must be documented.

---

Here is the interface comment for a method that copies data out of a Buffer object:

```java
/**
 * Copy a range of bytes from a buffer to an external location.
 *
 * \param offset
 *        Index within the buffer of the first byte to copy.
 * \param length
 *        Number of bytes to copy.
 * \param dest
 *        Where to copy the bytes: must have room for at least
 *        length bytes.
 *
 * \return
 *        The return value is the actual number of bytes copied,
 *        which may be less than length if the requested range of
 *        bytes extends past the end of the buffer. 0 is returned
 *        if there is no overlap between the requested range and
 *        the actual buffer.
 */

uint32_t
Buffer::copy(uint32_t offset, uint32_t length, void* dest)
...
```

The syntax of this comment (e.g., \return) follows the conventions of Doxygen, a program that extracts comments from C/C++ code and compiles them into Web pages. The goal of the comment is to provide all the information a developer needs in order to invoke the method, including how special cases are handled (note how this method follows the advice of Chapter 10 and defines out of existence any errors associated with the range specification). The developer should not need to read the body of the method in order to invoke it, and the interface comment provides no information about how the method is implemented, such as how it scans its internal data structures to find the desired data.

For a more extended example, let’s consider a class called IndexLookup, which is part of a distributed storage system. The storage system holds a collection of tables, each of which contains many objects. In addition, each table can have one or more indexes; each index provides efficient access to objects in the table based on a particular field of the object. For example, one index might be used to look up objects based on their name field, and another index might be used to look up objects based on their age field. With these indexes, applications can quickly extract all of the objects with a particular name, or all of those with an age in a given range.

The IndexLookup class provides a convenient interface for performing indexed lookups. Here is an example of how it might be used in an application:

```java
query = new IndexLookup(table, index, key1, key2);
while  (true) {
    object = query.getNext();
    if  (object == NULL) {
        break;
    }
    ... process object ...
}
```

The application first constructs an object of type IndexLookup, providing arguments that select a table, an index, and a range within the index (for example, if the index is based on an age field, key1 and key2 might be specified as 21 and 65 to select all objects with ages between those values). Then the application calls the getNext method repeatedly. Each invocation returns one object that falls within the desired range; once all of the matching objects have been returned, getNext returns NULL. Because the storage system is distributed, the implementation of this class is somewhat complex. The objects in a table may be spread across multiple servers, and each index may also be distributed across a different set of servers; the code in the IndexLookup class must first communicate with all of the relevant index servers to collect information about the objects in the range, then it must communicate with the servers that actually store the objects in order to retrieve their values.

Now let’s consider what information needs to be included in the interface comment for this class. For each piece of information given below, ask yourself whether a developer needs to know that information in order to use the class (my answers to the questions are at the end of the chapter):

1. The format of messages that the IndexLookup class sends to the servers holding indexes and objects.
2. The comparison function used to determine whether a particular object falls in the desired range (is comparison done using integers, floating-point numbers, or strings?).
3. The data structure used to store indexes on servers.
4. Whether or not IndexLookup issues multiple requests to different servers concurrently.
5. The mechanism for handling server crashes.

---

Here is the original version of the interface comment for the IndexLookup class; the excerpt also includes a few lines from the class’s definition, which are referred to in the comment:

```cpp
/*
 * This class implements the client side framework for index range
 * lookups. It manages a single LookupIndexKeys RPC and multiple
 * IndexedRead RPCs. Client side just includes "IndexLookup.h" in
 * its header to use IndexLookup class. Several parameters can be set
 * in the config below:
 * - The number of concurrent indexedRead RPCs
 * - The max number of PKHashes a indexedRead RPC can hold at a time
 * - The size of the active PKHashes
 *
 * To use IndexLookup, the client creates an object of this class by
 * providing all necessary information. After construction of
 * IndexLookup, client can call getNext() function to move to next
 * available object. If getNext() returns NULL, it means we reached
 * the last object. Client can use getKey, getKeyLength, getValue,
 * and getValueLength to get object data of current object.
 */
 class IndexLookup {
       ...
   private:
       /// Max number of concurrent indexedRead RPCs
       static const uint8_t NUM_READ_RPC = 10;
       /// Max number of PKHashes that can be sent in one
       /// indexedRead RPC
       static const uint32_t MAX_PKHASHES_PERRPC = 256;
       /// Max number of PKHashes that activeHashes can
       /// hold at once.
       static const size_t MAX_NUM_PK = (1 << LG_BUFFER_SIZE);
 }
```

Before reading further, see if you can identify the problems with this comment. Here are the problems that I found:

- Most of the first paragraph concerns the implementation, not the interface. As one example, users don’t need to know the names of the particular remote procedure calls used to communicate with the servers. The configuration parameters referred to in the second half of the first paragraph are all private variables that are relevant only to the maintainer of the class, not to its users. All of this implementation information should be omitted from the comment.
- The comment also includes several things that are obvious. For example, there’s no need to tell users to include IndexLookup.h: anyone who writes C++ code will be able to guess that this is necessary. In addition, the text “by providing all necessary information” says nothing, so it can be omitted.

---

A shorter comment for this class is sufficient (and preferable):

```java
/*
 * This class is used by client applications to make range queries
 * using indexes. Each instance represents a single range query.
 *
 * To start a range query, a client creates an instance of this
 * class. The client can then call getNext() to retrieve the objects
 * in the desired range. For each object returned by getNext(), the
 * caller can invoke getKey(), getKeyLength(), getValue(), and
 * getValueLength() to get information about that object.
 */
```

The last paragraph of this comment is not strictly necessary, since it mostly duplicates information in the comments for individual methods. However, it can be helpful to have examples in the class documentation that illustrate how its methods work together, particularly for deep classes with usage patterns that are nonobvious. Note that the new comment does not mention NULL return values from getNext. This comment is not intended to document every detail of each method; it just provides high level information to help readers understand how the methods work together and when each method might be invoked. For details, readers can refer to the interface comments for individual methods. This comment also does not mention server crashes; that is because server crashes are invisible to users of this class (the system automatically recovers from them).

img Red Flag: Implementation Documentation Contaminates Interface img

This red flag occurs when interface documentation, such as that for a method, describes implementation details that aren’t needed in order to use the thing being documented.

Now consider the following code, which shows the first version of the documentation for the isReady method in IndexLookup:

```cpp
/**
 * Check if the next object is RESULT_READY. This function is
 * implemented in a DCFT module, each execution of isReady() tries
 * to make small progress, and getNext() invokes isReady() in a
 * while loop, until isReady() returns true.
 *
 * isReady() is implemented in a rule-based approach. We check
 * different rules by following a particular order, and perform
 * certain actions if some rule is satisfied.
 *
 * \return
 *         True means the next Object is available. Otherwise, return
 *         false.
 */
bool IndexLookup::isReady() { ... }
```

Once again, most of this documentation, such as the reference to DCFT and the entire second paragraph, concerns the implementation, so it doesn’t belong here; this is one of the most common errors in interface comments. Some of the implementation documentation is useful, but it should go inside the method, where it will be clearly separated from interface documentation. In addition, the first sentence of the documentation is cryptic (what does RESULT_READY mean?) and some important information is missing. Finally, it isn’t necessary to describe the implementation of getNext here. Here is a better version of the comment:

```java
/*
 * Indicates whether an indexed read has made enough progress for
 * getNext to return immediately without blocking. In addition, this
 * method does most of the real work for indexed reads, so it must
 * be invoked (either directly, or indirectly by calling getNext) in
 * order for the indexed read to make progress.
 *
 * \return
 *         True means that the next invocation of getNext will not block
 *         (at least one object is available to return, or the end of the
 *         lookup has been reached); false means getNext may block.
 */
```

This version of the comment provides more precise information about what “ready” means, and it provides the important information that this method must eventually be invoked if the indexed retrieval is to move forward.

## 13.6 Implementation comments: what and why, not how

Implementation comments are the comments that appear inside methods to help readers understand how they work internally. Most methods are so short and simple that they don’t need any implementation comments: given the code and the interface comments, it’s easy to figure out how a method works.

The main goal of implementation comments is to help readers understand what the code is doing (not how it does it). Once readers know what the code is trying to do, it’s usually easy to understand how the code works. For short methods, the code only does one thing, which is already described in its interface comment, so no implementation comments are needed. Longer methods have several blocks of code that do different things as part of the method’s overall task. Add a comment before each of the major blocks to provide a high-level (more abstract) description of what that block does. Here is an example:

```java
// Phase 1: Scan active RPCs to see if any have completed.
```

For loops, it’s helpful to have a comment before the loop that describes what happens in each iteration:

```java
// Each iteration of the following loop extracts one request from
// the request message, increments the corresponding object, and
// appends a response to the response message.
```

Notice how this comment describes the loop at a more abstract and intuitive level; it doesn’t go into any details about how a request is extracted from the request message or how the object is incremented. Loop comments are only needed for longer or more complex loops, where it may not be obvious what the loop is doing; many loops are short and simple enough that their behavior is already obvious.

In addition to describing what the code is doing, implementation comments are also useful to explain why. If there are tricky aspects to the code that won’t be obvious from reading it, you should document them. For example, if a bug fix requires the addition of code whose purpose isn’t totally obvious, add a comment describing why the code is needed. For bug fixes where there is a well-written bug report describing the problem, the comment can refer to the issue in the bug tracking database rather than repeating all its details (“Fixes RAM-436, related to device driver crashes in Linux 2.4.x”). Developers can look in the bug database for more details (this is an example of avoiding duplication in comments, which will be discussed in Chapter 16).

For longer methods, it can be helpful to write comments for a few of the most important local variables. However, most local variables don’t need documentation if they have good names. If all of the uses of a variable are visible within a few lines of each other, it’s usually easy to understand the variable’s purpose without a comment. In this case it’s OK to let readers read the code to figure out the meaning of the variable. However, if the variable is used over a large span of code, then you should consider adding a comment to describe the variable. When documenting variables, focus on what the variable represents, not how it is manipulated in the code.

## 13.7 Cross-module design decisions

In a perfect world, every important design decision would be encapsulated within a single class. Unfortunately, real systems inevitably end up with design decisions that affect multiple classes. For example, the design of a network protocol will affect both the sender and the receiver, and these may be implemented in different places. Cross-module decisions are often complex and subtle, and they account for many bugs, so good documentation for them is crucial.

The biggest challenge with cross-module documentation is finding a place to put it where it will naturally be discovered by developers. Sometimes there is an obvious central place to put such documentation. For example, the RAMCloud storage system defines a Status value, which is returned by each request to indicate success or failure. Adding a Status for a new error condition requires modifying many different files (one file maps Status values to exceptions, another provides a human-readable message for each Status, and so on). Fortunately, there is one obvious place where developers will have to go when adding a new status value, which is the declaration of the Status enum. We took advantage of this by adding comments in that enum to identify all of the other places that must also be modified:

```cpp
typedef enum Status {
    STATUS_OK = 0,
    STATUS_UNKNOWN_TABLET                = 1,
    STATUS_WRONG_VERSION                 = 2,
    ...
    STATUS_INDEX_DOESNT_EXIST            = 29,
    STATUS_INVALID_PARAMETER             = 30,
    STATUS_MAX_VALUE                     = 30,
    // Note: if you add a new status value you must make the following
    // additional updates:
    // (1)  Modify STATUS_MAX_VALUE to have a value equal to the
    //      largest defined status value, and make sure its definition
    //      is the last one in the list. STATUS_MAX_VALUE is used
    //      primarily for testing.
    // (2)  Add new entries in the tables "messages" and "symbols" in
    //      Status.cc.
    // (3)  Add a new exception class to ClientException.h
    // (4)  Add a new "case" to ClientException::throwException to map
    //      from the status value to a status-specific ClientException
    //      subclass.
    // (5)  In the Java bindings, add a static class for the exception
    //      to ClientException.java
    // (6)  Add a case for the status of the exception to throw the
    //      exception in ClientException.java
    // (7)  Add the exception to the Status enum in Status.java, making
    //      sure the status is in the correct position corresponding to
    //      its status code.
}
```

New status values will be added at the end of the existing list, so the comments are also placed at the end, where they are most likely to be seen.

Unfortunately, in many cases there is not an obvious central place to put cross-module documentation. One example from the RAMCloud storage system was the code for dealing with zombie servers, which are servers that the system believes have crashed, but in fact are still running. Neutralizing zombie servers required code in several different modules, and these pieces of code all depend on each other. None of the pieces of code is an obvious central place to put documentation. One possibility is to duplicate parts of the documentation in each location that depends on it. However, this is awkward, and it is difficult to keep such documentation up to date as the system evolves. Alternatively, the documentation can be located in one of the places where it is needed, but in this case it’s unlikely that developers will see the documentation or know where to look for it.

I have recently been experimenting with an approach where cross-module issues are documented in a central file called designNotes. The file is divided up into clearly labeled sections, one for each major topic. For example, here is an excerpt from the file:

```
...
Zombies
-------
A zombie is a server that is considered dead by the rest of the
cluster; any data stored on the server has been recovered and will
be managed by other servers. However, if a zombie is not actually
dead (e.g., it was just disconnected from the other servers for a
while) two forms of inconsistency can arise:
* A zombie server must not serve read requests once replacement servers have taken over; otherwise it may return stale data that does not reflect writes accepted by the replacement servers.
* The zombie server must not accept write requests once replacement servers have begun replaying its log during recovery; if it does, these writes may be lost (the new values may not be stored on the replacement servers and thus will not be returned by reads).

RAMCloud uses two techniques to neutralize zombies. First,
...
```

Then, in any piece of code that relates to one of these issues there is a short comment referring to the designNotes file:

```c
// See "Zombies" in designNotes.
```

With this approach, there is only a single copy of the documentation and it is relatively easy for developers to find it when they need it. However, this has the disadvantage that the documentation is not near any of the pieces of code that depend on it, so it may be difficult to keep up-to-date as the system evolves.

## 13.8 Conclusion

The goal of comments is to ensure that the structure and behavior of the system is obvious to readers, so they can quickly find the information they need and make modifications to the system with confidence that they will work. Some of this information can be represented in the code in a way that will already be obvious to readers, but there is a significant amount of information that can’t easily be deduced from the code. Comments fill in this information.

When following the rule that comments should describe things that aren’t obvious from the code, “obvious” is from the perspective of someone reading your code for the first time (not you). When writing comments, try to put yourself in the mindset of the reader and ask yourself what are the key things he or she will need to know. If your code is undergoing review and a reviewer tells you that something is not obvious, don’t argue with them; if a reader thinks it’s not obvious, then it’s not obvious. Instead of arguing, try to understand what they found confusing and see if you can clarify that, either with better comments or better code.

## 13.9 Answers to questions from Section 13.5

Does a developer need to know each of the following pieces of information in order to use the IndexLookup class?

1. The format of messages that the IndexLookup class sends to the servers holding indexes and objects. No: this is an implementation detail that should be hidden within the class.
2. The comparison function used to determine whether a particular object falls in the desired range (is comparison done using integers, floating-point numbers, or strings?). Yes: users of the class need to know this information.
3. The data structure used to store indexes on servers. No: this information should be encapsulated on the servers; not even the implementation of IndexLookup should need to know this.
4. Whether or not IndexLookup issues multiple requests to different servers concurrently. Possibly: if IndexLookup uses special techniques to improve performance, then the documentation should provide some high-level information about this, since users may care about performance.
5. The mechanism for handling server crashes. No: RAMCloud recovers automatically from server crashes, so crashes are not visible to application-level software; thus, there is no need to mention crashes in the interface documentation for IndexLookup. If crashes were reflected up to applications, then the interface documentation would need to describe how they manifest themselves (but not the details of how crash recovery works).

---
