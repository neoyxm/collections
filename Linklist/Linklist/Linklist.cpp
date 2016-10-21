#include <iostream>
#include "Linklist.h"
using namespace std;

Linklist MakeEmpty()
{
    PtrNode n = new Node();
    n->next = NULL;
    return n;
}

bool IsEmpty(Linklist L)
{
    return (L->next == NULL)?true:false;
}

bool IsLast(Linklist L, Position p)
{
    return (p->next== NULL)?true:false;
}

Position Insert(Linklist L, ElementType e, Position p)
{
    PtrNode newNode = new Node();
    newNode->data = e;
    newNode->next = p->next;
    p->next = newNode;

    return newNode;
}

Position FindPrevious(Linklist L, ElementType e)
{
    Position p = L;
    
    while (p->next && p->next->data != e)
        p = p->next;

    return p;
}

Position Delete(Linklist L, ElementType e)
{
    Position p = FindPrevious(L, e);

    if (!IsLast(L, p))
    {
        PtrNode removedOne = p->next;
        p->next = removedOne->next;
        delete removedOne;
    }
    return p;
}

void PrintLinklist(Linklist L)
{
    Position p = L->next;

    while (p)
    {
        cout << p->data << endl;
        p = p->next;
    }
}
