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

Linklist MakeEmpty();
Position Insert(Linklist L, ElementType e, Position p);
bool IsEmpty(Linklist L);
bool IsLast(Linklist L, Position p);
Position FindPrevious(Linklist L, ElementType e);
Position Delete(Linklist L, ElementType e, Position last);
Position Empty(Linklist L);
void PrintLinklist(Linklist L);
#endif
