    interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

interface CoursePartSharedOne extends CoursePartBase{
    description: string;
}

interface CoursePartSharedTwo extends CoursePartBase{
    groupProjectCount: number;
}

interface CoursePartOne extends CoursePartBase, CoursePartSharedOne {
    name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase, CoursePartSharedTwo {
    name: "Using props to pass data";
}

interface CoursePartThree extends CoursePartBase, CoursePartSharedOne {
    name: "Deeper type usage";
    exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartBase, CoursePartSharedOne, CoursePartSharedTwo {
    name: "Super Duper";
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;