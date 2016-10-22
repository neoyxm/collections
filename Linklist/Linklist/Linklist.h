#ifndef _Linklist_H_
#define _Linklist_H_

typedef int ElementType;
struct Node;
typedef Node * PtrNode;
typedef PtrNode Linklist; 
typedef PtrNode Position;

struct Node {
    ElementType data;
    Position    next;
};

struct LinklistImpl{
    Linklist L;
    Position Tail;
};

int MakeEmpty(LinklistImpl *pLinklistImpl);

int Insert(LinklistImpl *pLinklistImpl, ElementType e, Position p);
bool IsLast(LinklistImpl *pLinklistImpl, Position p);
int Add(LinklistImpl *pLinklistImpl, ElementType e);
void PrintLinklist(LinklistImpl *pLinklistImpl);

#if 0
bool IsEmpty(Linklist L);
bool IsLast(Linklist L, Position p);
Position FindPrevious(Linklist L, ElementType e);
Position Delete(Linklist L, ElementType e, Position last);
Position Empty(Linklist L);
void PrintLinklist(Linklist L);
#endif
#endif
