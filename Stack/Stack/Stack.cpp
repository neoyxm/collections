#include <cstdlib>
#include "Stack.h"

Stack createStack(int MaxElements)
{
    Stack s = NULL;

    s = new StackRecord();
    if (!s || MaxElements <= 0)
        return NULL;

    s->capacity   = MaxElements;
    s->top        = -1;
    s->stackArray = new ElementType[MaxElements];
    if (!s->stackArray)
    {
        delete s;
        s = NULL;
    }
    return s;
}

int  push(Stack s, ElementType e)
{
    if (!s)
        return -1;

    if (s->top == s->capacity - 1)
        return -1;

    s->stackArray[++s->top] = e;

    return 0;
}

int pop(Stack s, ElementType &e)
{
    if (!s || s->top < 0)
        return -1;

     e =  s->stackArray[s->top--];

    return 0;
}

void destroyStack(Stack s)
{
    if (!s)
        return;

    delete [] s->stackArray;
    delete s;
}