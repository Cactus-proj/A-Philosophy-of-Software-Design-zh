# Chapter 12 Why Write Comments? The Four Excuses

In-code documentation plays a crucial role in software design. Comments are essential to help developers understand a system and work efficiently, but the role of comments goes beyond this. Documentation also plays an important role in abstraction; without comments, you can’t hide complexity. Finally, the process of writing comments, if done correctly, will actually improve a system’s design. Conversely, a good software design loses much of its value if it is poorly documented.

Unfortunately, this view is not universally shared. A significant fraction of production code contains essentially no comments. Many developers think that comments are a waste of time; others see the value in comments, but somehow never get around to writing them. Fortunately, many development teams recognize the value of documentation, and it feels like the prevalence of these teams is gradually increasing. However, even in teams that encourage documentation, comments are often viewed as drudge work and many developers don’t understand how to write them, so the resulting documentation is often mediocre. Inadequate documentation creates a huge and unnecessary drag on software development.

In this chapter I will discuss the excuses developers use to avoid writing comments, and the reasons why comments really do matter. Chapter 13 will then describe how to write good comments and the next few chapters after that will discuss related issues such as choosing variable names and how to use documentation to improve a system’s design. I hope these chapters will convince you of three things: good comments can make a big difference in the overall quality of software; it isn’t hard to write good comments; and (this may be hard to believe) writing comments can actually be fun.

When developers don’t write comments, they usually justify their behavior with one or more of the following excuses:

- “Good code is self-documenting.”
- “I don’t have time to write comments.”
- “Comments get out of date and become misleading.”
- “The comments I have seen are all worthless; why bother?” In the sections below I will address each of these excuses in turn.

---

## 12.1 Good code is self-documenting

Some people believe that if code is written well, it is so obvious that no comments are needed. This is a delicious myth, like a rumor that ice cream is good for your health: we’d really like to believe it! Unfortunately, it’s simply not true. To be sure, there are things you can do when writing code to reduce the need for comments, such as choosing good variable names (see Chapter 14). Nonetheless, there is still a significant amount of design information that can’t be represented in code. For example, only a small part of a class’s interface, such as the signatures of its methods, can be specified formally in the code. The informal aspects of an interface, such as a high-level description of what each method does or the meaning of its result, can only be described in comments. There are many other examples of things that can’t be described in the code, such as the rationale for a particular design decision, or the conditions under which it makes sense to call a particular method.

Some developers argue that if others want to know what a method does, they should just read the code of the method: this will be more accurate than any comment. It’s possible that a reader could deduce the abstract interface of the method by reading its code, but it would be time-consuming and painful. In addition, if you write code with the expectation that users will read method implementations, you will try to make each method as short as possible, so that it’s easy to read. If the method does anything nontrivial, you will break it up into several smaller methods. This will result in a large number of shallow methods. Furthermore, it doesn’t really make the code easier to read: in order to understand the behavior of the top-level method, readers will probably need to understand the behaviors of the nested methods. For large systems it isn’t practical for users to read the code to learn the behavior.

Moreover, comments are fundamental to abstractions. Recall from Chapter 4 that the goal of abstractions is to hide complexity: an abstraction is a simplified view of an entity, which preserves essential information but omits details that can safely be ignored. If users must read the code of a method in order to use it, then there is no abstraction: all of the complexity of the method is exposed. Without comments, the only abstraction of a method is its declaration, which specifies its name and the names and types of its arguments and results. The declaration is missing too much essential information to provide a useful abstraction by itself. For example, a method to extract a substring might have two arguments, start and end, indicating the range of characters to extract. From the declaration alone, it isn’t possible to tell whether the extracted substring will include the character indicated by end, or what happens if start > end. Comments allow us to capture the additional information that callers need, thereby completing the simplified view while hiding implementation details. It’s also important that comments are written in a human language such as English; this makes them less precise than code, but it provides more expressive power, so we can create simple, intuitive descriptions. If you want to use abstractions to hide complexity, comments are essential.

## 12.2 I don’t have time to write comments

It’s tempting to prioritize comments lower than other development tasks. Given a choice between adding a new feature and documenting an existing feature, it seems logical to choose the new feature. However, software projects are almost always under time pressure, and there will always be things that seem higher priority than writing comments. Thus, if you allow documentation to be de-prioritized, you’ll end up with no documentation.

The counter-argument to this excuse is the investment mindset discussed on page 15. If you want a clean software structure, which will allow you to work efficiently over the long-term, then you must take some extra time up front in order to create that structure. Good comments make a huge difference in the maintainability of software, so the effort spent on them will pay for itself quickly. Furthermore, writing comments needn’t take a lot of time. Ask yourself how much of your development time you spend typing in code (as opposed to designing, compiling, testing, etc.), assuming you don’t include any comments; I doubt that the answer is more than 10%. Now suppose that you spend as much time typing comments as typing code; this should be a safe upper bound. With these assumptions, writing good comments won’t add more than about 10% to your development time. The benefits of having good documentation will quickly offset this cost.

Furthermore, many of the most important comments are those related to abstractions, such as the top-level documentation for classes and methods. Chapter 15 will argue that these comments should be written as part of the design process, and that the act of writing the documentation serves as an important design tool that improves the overall design. These comments pay for themselves immediately.

## 12.3 Comments get out of date and become misleading

Comments do sometimes get out of date, but this need not be a major problem in practice. Keeping documentation up-to-date does not require an enormous effort. Large changes to the documentation are only required if there have been large changes to the code, and the code changes will take more time than the documentation changes. Chapter 16 discusses how to organize documentation so that it is as easy as possible to keep it updated after code modifications (the key ideas are to avoid duplicated documentation and keep the documentation close to the corresponding code). Code reviews provide a great mechanism for detecting and fixing stale comments.

## 12.4 All the comments I have seen are worthless

Of the four excuses, this is probably the one with the most merit. Every software developer has seen comments that provide no useful information, and most existing documentation is so-so at best. Fortunately, this problem is solvable; writing solid documentation is not hard, once you know how. The next chapters will lay out a framework for how to write good documentation and maintain it over time.

## 12.5 Benefits of well-written comments

Now that I have discussed (and, hopefully, debunked) the arguments against writing comments, let’s consider the benefits that you will get from good comments. The overall idea behind comments is to capture information that was in the mind of the designer but couldn’t be represented in the code. This information ranges from low-level details, such as a hardware quirk that motivates a particularly tricky piece of code, up to high-level concepts such as the rationale for a class. When other developers come along later to make modifications, the comments will allow them to work more quickly and accurately. Without documentation, future developers will have to rederive or guess at the developer’s original knowledge; this will take additional time, and there is a risk of bugs if the new developer misunderstands the original designer’s intentions. Comments are valuable even when the original designer is the one making the changes: if it has been more than a few weeks since you last worked in a piece of code, you will have forgotten many of the details of the original design.

Chapter 2 described three ways in which complexity manifests itself in software systems:

- Change amplification: a seemingly simple change requires code modifications in many places.
- Cognitive load: in order to make a change, the developer must accumulate a large amount of information.
- Unknown unknowns: it is unclear what code needs to be modified, or what information must be considered in order to make those modifications.

---

Good documentation helps with the last two of these issues. Documentation can reduce cognitive load by providing developers with the information they need to make changes and by making it easy for developers to ignore information that is irrelevant. Without adequate documentation, developers may have to read large amounts of code to reconstruct what was in the designer’s mind. Documentation can also reduce the unknown unknowns by clarifying the structure of the system, so that it is clear what information and code is relevant for any given change.

Chapter 2 pointed out that the primary causes of complexity are dependencies and obscurity. Good documentation can clarify dependencies, and it fills in gaps to eliminate obscurity.

The next few chapters will show you how to write good documentation. They will also discuss how to integrate documentation-writing into the design process so that it improves the design of your software.
