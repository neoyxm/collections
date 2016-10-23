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
bool IsEmpty(Linklist L);
Position FindPrevious(LinklistImpl *pLinklistImpl, ElementType e);
int Delete(LinklistImpl *pLinklistImpl, ElementType e);
Position Empty(LinklistImpl *pLinklistImpl);
#endif
