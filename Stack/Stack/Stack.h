#ifndef _STACK_H_
#define _STACK_H_

typedef int ElementType;

struct StackRecord{
    int capacity;
    int top;
    ElementType *stackArray;
};

typedef StackRecord*  Stack;

Stack createStack(int MaxElements);
int  push(Stack s, ElementType e);
int pop(Stack s, ElementType &e);
void destroyStack(Stack s);

#endif