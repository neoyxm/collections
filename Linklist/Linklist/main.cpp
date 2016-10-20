
#include "Linklist.h"
#include <iostream>
using namespace std;

int main()
{
    Linklist L = MakeEmpty();
    Position p = L;

    if (IsEmpty(L))
        cout << "The list is empty" << endl;
    if (IsLast(L, p))
        cout << "The current pos is last" << endl;

    p = Insert(L, 1, p);
    p = Insert(L, 2, p);
    p = Insert(L, 3, p);
    p = Insert(L, 4, p);

    PrintLinklist(L);

    if (!IsEmpty(L))
        cout << "The list is not empty" << endl;

    if (IsLast(L, p))
        cout << "The current pos is last" << endl;

    Delete(L, 4);
    cout << "Remove the element 4" << endl;
    PrintLinklist(L);

    Delete(L, 5);
    cout << "Remove the not exists element 5" << endl;
    PrintLinklist(L);

    int i;
    cin >> i;

    return 0;    
}