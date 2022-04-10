# Chapter 17 Consistency

Consistency is a powerful tool for reducing the complexity of a system and making its behavior more obvious. If a system is consistent, it means that similar things are done in similar ways, and dissimilar things are done in different ways. Consistency creates cognitive leverage: once you have learned how something is done in one place, you can use that knowledge to immediately understand other places that use the same approach. If a system is not implemented in a consistent fashion, developers must learn about each situation separately. This will take more time.

Consistency reduces mistakes. If a system is not consistent, two situations may appear the same when in fact they are different. A developer may see a pattern that looks familiar and make incorrect assumptions based on previous encounters with that pattern. On the other hand, if the system is consistent, assumptions made based on familiar-looking situations will be safe. Consistency allows developers to work more quickly with fewer mistakes.

## 17.1 Examples of consistency

Consistency can be applied at many levels in a system; here are a few examples.

Names. Chapter 14 has already discussed the benefits of using names in a consistent way.

Coding style. It is common nowadays for development organizations to have style guides that restrict program structure beyond the rules enforced by compilers. Modern style guides address a range of issues, such as indentation, curly-brace placement, order of declarations, naming, commenting, and restrictions on language features considered dangerous. Style guidelines make code easier to read and can reduce some kinds of errors.

Interfaces. An interface with multiple implementations is another example of consistency. Once you understand one implementation of the interface, any other implementation becomes easier to understand because you already know the features it will have to provide.

Design patterns. Design patterns are generally-accepted solutions to certain common problems, such as the model-view-controller approach to user interface design. If you can use an existing design pattern to solve the problem, the implementation will proceed more quickly, it is more likely to work, and your code will be more obvious to readers. Design patterns are discussed in more detail in Section 19.5.

Invariants. An invariant is a property of a variable or structure that is always true. For example, a data structure storing lines of text might enforce an invariant that each line is terminated by a newline character. Invariants reduce the number of special cases that must be considered in code and make it easier to reason about the code’s behavior.

## 17.2 Ensuring consistency

Consistency is hard to maintain, especially when many people work on a project over a long time. People in one group may not know about conventions established in another group. Newcomers don’t know the rules, so they unintentionally violate the conventions and create new conventions that conflict with existing ones. Here are a few tips for establishing and maintaining consistency:

Document. Create a document that lists the most important overall conventions, such as coding style guidelines. Place the document in a spot where developers are likely to see it, such as a conspicuous place on the project Wiki. Encourage new people joining the group to read the document, and encourage existing people to review it every once in a while. Several style guides from various organizations have been published on the Web; consider starting with one of these.

For conventions that are more localized, such as invariants, find an appropriate spot in the code to document them. If you don’t write the conventions down, it’s unlikely that other people will follow them.

Enforce. Even with good documentation, it’s hard for developers to remember all of the conventions. The best way to enforce conventions is to write a tool that checks for violations, and make sure that code cannot be committed to the repository unless it passes the checker. Automated checkers work particularly well for low-level syntactic conventions.

One of my recent projects had problems with line termination characters. Some developers worked on Unix, where lines are terminated by newlines; others worked on Windows, where lines are normally terminated by a carriage-return followed by a newline. If a developer on one system made a small edit to a file previously edited on the other system, the editor would sometimes replace all of the line terminators with ones appropriate for that system. This gave the appearance that every line of the file had been modified, which made it hard to track the meaningful changes. We established a convention that files should contain newlines only, but it was hard to ensure that every tool used by every developer followed the convention. Every time a new developer joined the project, we would experience a rash of line termination problems while that developer adjusted to the convention.

We eventually solved this problem by writing a short script that was executed automatically before changes are committed to the source code repository. The script checks all of the files that have been modified and aborts the commit if any of them contain carriage returns. The script can also be run manually to repair damaged files by replacing carriage-return/newline sequences with newlines. This instantly eliminated the problems, and it also helped train new developers.

Code reviews provide another opportunity for enforcing conventions and for educating new developers about the conventions. The more nit-picky that code reviewers are, the more quickly everyone on the team will learn the conventions, and the cleaner the code will be.

When in Rome ... The most important convention of all is that every developer should follow the old adage “When in Rome, do as the Romans do.” When working in a new file, look around to see how the existing code is structured. Are all public variables and methods declared before private ones? Are the methods in alphabetical order? Do variables use “camel case,” as in firstServerName, or “snake case,” as in first_server_name? When you see anything that looks like it might possibly be a convention, follow it. When making a design decision, ask yourself if it’s likely that a similar decision was made elsewhere in the project; if so, find an existing example and use the same approach in your new code.

Don’t change existing conventions. Resist the urge to “improve” on existing conventions. Having a “better idea” is not a sufficient excuse to introduce inconsistencies. Your new idea may indeed be better, but the value of consistency over inconsistency is almost always greater than the value of one approach over another. Before introducing inconsistent behavior, ask yourself two questions. First, do you have significant new information justifying your approach that wasn’t available when the old convention was established? Second, is the new approach so much better that it is worth taking the time to update all of the old uses? If your organization agrees that the answers to both questions are “yes,” then go ahead and make the upgrade; when you are done, there should be no sign of the old convention. However, you still run the risk that other developers will not know about the new convention, so they may reintroduce the old approach in the future. Overall, reconsidering established conventions is rarely a good use of developer time.

## 17.3 Taking it too far

Consistency means not only that similar things should be done in similar ways, but that dissimilar things should be done in different ways. If you become overzealous about consistency and try to force dissimilar things into the same approach, such as by using the same variable name for things that are really different or using an existing design pattern for a task that doesn’t fit the pattern, you’ll create complexity and confusion. Consistency only provides benefits when developers have confidence that “if it looks like an x, it really is an x.”

## 17.4 Conclusion

Consistency is another example of the investment mindset. It will take a bit of extra work to ensure consistency: work to decide on conventions, work to create automated checkers, work to look for similar situations to mimic in new code, and work in code reviews to educate the team. The return on this investment is that your code will be more obvious. Developers will be able to understand the code’s behavior more quickly and accurately, and this will allow them to work faster, with fewer bugs.
