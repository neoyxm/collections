#ifndef _STACK_H_
#define _STACK_H_

typedef char ElementType;

struct StackRecord{
    int capacity;
    int top;
    ElementType *stackArray;
};

typedef StackRecord*  Stack;

Stack createStack(int MaxElements);
int  push(Stack s, ElementType e);
int pop(Stack s, ElementType &e);
int top(Stack s, ElementType &e);
bool isEmpty(Stack s);
void destroyStack(Stack s);

#endif