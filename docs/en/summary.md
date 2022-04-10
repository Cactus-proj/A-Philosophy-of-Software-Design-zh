# Summary

## Summary of Design Principles

Here are the most important software design principles discussed in this book:

1. Complexity is incremental: you have to sweat the small stuff (see p. 11).
2. Working code isn’t enough (see p. 14).
3. Make continual small investments to improve system design (see p. 15).
4. Modules should be deep (see p. 22)
5. Interfaces should be designed to make the most common usage as simple as possible (see p. 27).
6. It’s more important for a module to have a simple interface than a simple implementation (see pp. 55, 71).
7. General-purpose modules are deeper (see p. 39).
8. Separate general-purpose and special-purpose code (see p. 62).
9. Different layers should have different abstractions (see p. 45).
10. Pull complexity downward (see p. 55).
11. Define errors (and special cases) out of existence (see p. 79).
12. Design it twice (see p. 91).
13. Comments should describe things that are not obvious from the code (see p. 101).
14. Software should be designed for ease of reading, not ease of writing (see p. 149).
15. The increments of software development should be abstractions, not features (see p. 154).

---

## Summary of Red Flags

Here are a few of of the most important red flags discussed in this book. The presence of any of these symptoms in a system suggests that there is a problem with the system’s design:

- Shallow Module: the interface for a class or method isn’t much simpler than its implementation (see pp. 25, 110).
- Information Leakage: a design decision is reflected in multiple modules (see p. 31).
- Temporal Decomposition: the code structure is based on the order in which operations are executed, not on information hiding (see p. 32).
- Overexposure: An API forces callers to be aware of rarely used features in order to use commonly used features (see p. 36).
- Pass-Through Method: a method does almost nothing except pass its arguments to another method with a similar signature (see p. 46).
- Repetition: a nontrivial piece of code is repeated over and over (see p. 62).
- Special-General Mixture: special-purpose code is not cleanly separated from general purpose code (see p. 65).
- Conjoined Methods: two methods have so many dependencies that its hard to understand the implementation of one without understanding the implementation of the other (see p. 72).
- Comment Repeats Code: all of the information in a comment is immediately obvious from the code next to the comment (see p. 104).
- Implementation Documentation Contaminates Interface: an interface comment describes implementation details not needed by users of the thing being documented (see p. 114).
- Vague Name: the name of a variable or method is so imprecise that it doesn’t convey much useful information (see p. 123).
- Hard to Pick Name: it is difficult to come up with a precise and intuitive name for an entity (see p. 125).
- Hard to Describe: in order to be complete, the documentation for a variable or method must be long. (see p. 131).
- Nonobvious Code: the behavior or meaning of a piece of code cannot be understood easily. (see p. 148).

---

## About the Author

John Ousterhout is the Bosack Lerner Professor of Computer Science at Stanford University. He is the creator of the Tcl scripting language and is also well known for his work in distributed operating systems and storage systems. Ousterhout received a BS degree in Physics from Yale University and a PhD in Computer Science from Carnegie Mellon University. He is a member of the National Academy of Engineering and has received numerous awards, including the ACM Software System Award, the ACM Grace Murray Hopper Award, the National Science Foundation Presidential Young Investigator Award, and the U.C. Berkeley Distinguished Teaching Award.
