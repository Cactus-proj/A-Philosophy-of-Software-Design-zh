# Chapter 6 General-Purpose Modules are Deeper

One of the most common decisions that you will face when designing a new module is whether to implement it in a general-purpose or special-purpose fashion. Some might argue that you should take a general-purpose approach, in which you implement a mechanism that can be used to address a broad range of problems, not just the ones that are important today. In this case, the new mechanism may find unanticipated uses in the future, thereby saving time. The general-purpose approach seems consistent with the investment mindset discussed in Chapter 3, where you spend a bit more time up front to save time later on.

On the other hand, we know that it’s hard to predict the future needs of a software system, so a general-purpose solution might include facilities that are never actually needed. Furthermore, if you implement something that is too general-purpose, it might not do a good job of solving the particular problem you have today. As a result, some might argue that it’s better to focus on today’s needs, building just what you know you need, and specializing it for the way you plan to use it today. If you take the special-purpose approach and discover additional uses later, you can always refactor it to make it general-purpose. The special-purpose approach seems consistent with an incremental approach to software development.

## 6.1 Make classes somewhat general-purpose

In my experience, the sweet spot is to implement new modules in a somewhat general-purpose fashion. The phrase “somewhat general-purpose” means that the module’s functionality should reflect your current needs, but its interface should not. Instead, the interface should be general enough to support multiple uses. The interface should be easy to use for today’s needs without being tied specifically to them. The word “somewhat” is important: don’t get carried away and build something so general-purpose that it is difficult to use for your current needs.

The most important (and perhaps surprising) benefit of the general-purpose approach is that it results in simpler and deeper interfaces than a special-purpose approach. The general-purpose approach can also save you time in the future, if you reuse the class for other purposes. However, even if the module is only used for its original purpose, the general-purpose approach is still better because of its simplicity.

## 6.2 Example: storing text for an editor

Let’s consider an example from a software design class in which students were asked to build simple GUI text editors. The editors had to display a file and allow users to point, click, and type to edit the file. The editors had to support multiple simultaneous views of the same file in different windows; they also had to support multi-level undo and redo for modifications to the file.

Each of the student projects included a class that managed the underlying text of the file. The text classes typically provided methods for loading a file into memory, reading and modifying the text of the file, and writing the modified text back to a file.

Many of the student teams implemented special-purpose APIs for the text class. They knew that the class was going to be used in an interactive editor, so they thought about the features that the editor had to provide and tailored the API of the text class to those specific features. For example, if a user of the editor typed the backspace key, the editor deleted the character immediately to the left of the cursor; if the user typed the delete key, the editor deleted the character immediately to the right of the cursor. Knowing this, some of the teams created one method in the text class to support each of these specific features:

```java
void backspace(Cursor cursor);

void delete(Cursor cursor);
```

Each of these methods takes the cursor position as its argument; a special type Cursor represents this position. The editor also had to support a selection that could be copied or deleted. The students handled this by defining a Selection class and passing an object of this class to the text class during deletions:

```java
void deleteSelection(Selection selection);
```

The students probably thought that it would be easier to implement the user interface if the methods of the text class corresponded to the features visible to users. In reality, however, this specialization provided little benefit for the user interface code, and it created a high cognitive load for developers working on either the user interface or the text class. The text class ended up with a large number of shallow methods, each of which was only suitable for one user interface operation. Many of the methods, such as delete, were only invoked in a single place. As a result, a developer working on the user interface had to learn about a large number of methods for the text class.

This approach created information leakage between the user interface and the text class. Abstractions related to the user interface, such as the selection or the backspace key, were reflected in the text class; this increased the cognitive load for developers working on the text class. Each new user interface operation required a new method to be defined in the text class, so a developer working on the user interface was likely to end up working on the text class as well. One of the goals in class design is to allow each class to be developed independently, but the specialized approach tied the user interface and text classes together.

## 6.3 A more general-purpose API API

A better approach is to make the text class more generic. Its API should be defined only in terms of basic text features, without reflecting the higher-level operations that will be implemented with it. For example, only two methods are needed for modifying text:

```java
void insert(Position position, String newText);

void delete(Position start, Position end);
```

The first method inserts an arbitrary string at an arbitrary position within the text, and the second method deletes all of the characters at positions greater than or equal to start but less than end. This API also uses a more generic type Position instead of Cursor, which reflects a specific user interface. The text class should also provide general-purpose facilities for manipulating positions within the text, such as the following:

```java
Position changePosition(Position position, int numChars);
```

This method returns a new position that is a given number of characters away from a given position. If the numChars argument is positive, the new position is later in the file than position; if numChars is negative, the new position is before position. The method automatically skips to the next or previous line when necessary. With these methods, the delete key can be implemented with the following code (assuming the cursor variable holds the current cursor position):

```java
text.delete(cursor, text.changePosition(cursor, 1));
```

Similarly, the backspace key can be implemented as follows:

```java
text.delete(text.changePosition(cursor, -1), cursor);
```

With the general-purpose text API, the code to implement user interface functions such as delete and backspace is a bit longer than with the original approach using a specialized text API. However, the new code is more obvious than the old code. A developer working in the user interface module probably cares about which characters are deleted by the backspace key. With the new code, this is obvious. With the old code, the developer had to go to the text class and read the documentation and/or code of the backspace method to verify the behavior. Furthermore, the general-purpose approach has less code overall than the specialized approach, since it replaces a large number of special-purpose methods in the text class with a smaller number of general-purpose ones.

A text class implemented with the general-purpose interface could potentially be used for other purposes besides an interactive editor. As one example, suppose you were building an application that modified a specified file by replacing all occurrences of a particular string with another string. Methods from the specialized text class, such as backspace and delete, would have little value for this application. However, the general-purpose text class would already have most of the functionality needed for the new application. All that is missing is a method to search for the next occurrence of a given string, such as this:

```java
Position findNext(Position start, String string);
```

Of course, an interactive text editor is likely to have a mechanism for searching and replacing, in which case the text class would already include this method.

## 6.4 Generality leads to better information hiding

The general-purpose approach provides a cleaner separation between the text and user interface classes, which results in better information hiding. The text class need not be aware of specifics of the user interface, such as how the backspace key is handled; these details are now encapsulated in the user interface class. New user interface features can be added without creating new supporting functions in the text class. The general-purpose interface also reduces cognitive load: a developer working on the user interface only needs to learn a few simple methods, which can be reused for a variety of purposes.

The backspace method in the original version of the text class was a false abstraction. It purported to hide information about which characters are deleted, but the user interface module really needs to know this; user interface developers are likely to read the code of the backspace method in order to confirm its precise behavior. Putting the method in the text class just makes it harder for user interface developers to get the information they need. One of the most important elements of software design is determining who needs to know what, and when. When the details are important, it is better to make them explicit and as obvious as possible, such as the revised implementation of the backspace operation. Hiding this information behind an interface just creates obscurity.

## 6.5 Questions to ask yourself

It is easier to recognize a clean general-purpose class design than it is to create one. Here are some questions you can ask yourself, which will help you to find the right balance between general-purpose and special-purpose for an interface.

What is the simplest interface that will cover all my current needs? If you reduce the number of methods in an API without reducing its overall capabilities, then you are probably creating more general-purpose methods. The special-purpose text API had at least three methods for deleting text: backspace, delete, and deleteSelection. The more general-purpose API had only one method for deleting text, which served all three purposes. Reducing the number of methods makes sense only as long as the API for each individual method stays simple; if you have to introduce lots of additional arguments in order to reduce the number of methods, then you may not really be simplifying things.

In how many situations will this method be used? If a method is designed for one particular use, such as the backspace method, that is a red flag that it may be too special-purpose. See if you can replace several special-purpose methods with a single general-purpose method.

Is this API easy to use for my current needs? This question can help you to determine when you have gone too far in making an API simple and general-purpose. If you have to write a lot of additional code to use a class for your current purpose, that’s a red flag that the interface doesn’t provide the right functionality. For example, one approach for the text class would be to design it around single-character operations: insert inserts a single character and delete deletes a single character. This API is both simple and general-purpose. However, it would not be particularly easy to use for a text editor: higher-level code would contain lots of loops to insert or delete ranges of characters. The single-character approach would also be inefficient for large operations. Thus it’s better for the text class to have built-in support for operations on ranges of characters.

## 6.6 Conclusion

General-purpose interfaces have many advantages over special-purpose ones. They tend to be simpler, with fewer methods that are deeper. They also provide a cleaner separation between classes, whereas special-purpose interfaces tend to leak information between classes. Making your modules somewhat general-purpose is one of the best ways to reduce overall system complexity.
