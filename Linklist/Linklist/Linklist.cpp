#include <iostream>
#include "Linklist.h"
using namespace std;

int MakeEmpty(LinklistImpl *pLinklistImpl)
{
    if (!pLinklistImpl)
        return -1;

    PtrNode n = new Node();
    if (!n)
        return -1;

    n->next = NULL;
    pLinklistImpl->L = pLinklistImpl->Tail = n;
    
    return 0;
}


int Insert(LinklistImpl *pLinklistImpl, ElementType e, Position p)
{
    PtrNode newNode = new Node();
    if (!newNode)
        return -1;
    newNode->data = e;
    newNode->next = p->next;

    if (IsLast(pLinklistImpl, p))
    {
        pLinklistImpl->Tail = newNode;
    }   
    p->next = newNode;

    return 0;
}

int Add(LinklistImpl *pLinklistImpl, ElementType e)
{
    return Insert(pLinklistImpl, e, pLinklistImpl->Tail);
}


bool IsLast(LinklistImpl *pLinklistImpl, Position p)
{
    return (p->next== NULL)?true:false;
}


void PrintLinklist(LinklistImpl *pLinklistImpl)
{
    if (!pLinklistImpl)
        return;

    Position p = pLinklistImpl->L->next;

    while (p)
    {
        cout << p->data << endl;
        p = p->next;
    }
}
#if 0


bool IsEmpty(Linklist L)
{
    return (L->next == NULL)?true:false;
}




Position FindPrevious(Linklist L, ElementType e)
{
    Position p = L;
    
    while (p->next && p->next->data != e)
        p = p->next;

    return p;
}

Position Delete(Linklist L, ElementType e, Position last)
{
    Position p = FindPrevious(L, e);

    if (!IsLast(L, p))
    {
        
        PtrNode removedOne = p->next;
        p->next = removedOne->next;
        
        if (last == removedOne)
            last = p;
        delete removedOne;
    }
    return last;
}

Position Empty(Linklist L)
{
    Position p =  L->next;
    
    while(p)
    {
        PtrNode removeNode = p;
        p = p->next;
        
        removeNode->next = NULL;
        delete removeNode;
    }
    
    L->next = NULL;
    return L;
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
#endif
