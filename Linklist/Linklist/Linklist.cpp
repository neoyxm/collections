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

bool IsEmpty(LinklistImpl *pLinklistImpl)
{
    if (!pLinklistImpl)
        return true;

    return (pLinklistImpl->L->next == NULL) ? true : false;
}


Position FindPrevious(LinklistImpl *pLinklistImpl, ElementType e)
{
    if (!pLinklistImpl)
        return NULL;

    Position p = pLinklistImpl->L;

    while (p->next && p->next->data != e)
        p = p->next;

    return p;
}

int Delete(LinklistImpl *pLinklistImpl, ElementType e)
{
    if (!pLinklistImpl)
        return -1;

    Position p = FindPrevious(pLinklistImpl, e);

    if (!IsLast(pLinklistImpl, p))
    {

        PtrNode removedOne = p->next;
        p->next = removedOne->next;

        delete removedOne;
    }

    return 0;
}

Position Empty(LinklistImpl *pLinklistImpl)
{
    if (!pLinklistImpl)
        return NULL;

    Position p = pLinklistImpl->L->next;

    while(p)
    {
        PtrNode removeNode = p;
        p = p->next;

        removeNode->next = NULL;
        delete removeNode;
    }

    pLinklistImpl->L->next = NULL;
    pLinklistImpl->Tail    = pLinklistImpl->L;
    return pLinklistImpl->L;
}

