
#include "Linklist.h"
#include <iostream>
using namespace std;

int main()
{
    Linklist L = MakeEmpty();
    Position last = L;

    if (IsEmpty(L))
        cout << "The list is empty" << endl;
    if (IsLast(L, last))
        cout << "The current pos is last" << endl;

    last = Insert(L, 1, last);
    last = Insert(L, 2, last);
    last = Insert(L, 3, last);
    last = Insert(L, 4, last);

    PrintLinklist(L);

    if (!IsEmpty(L))
        cout << "The list is not empty" << endl;

    if (IsLast(L, last))
        cout << "The current pos is last" << endl;

    last = Delete(L, 4, last);
    cout << "Remove the element 4" << endl;
    PrintLinklist(L);

    last = Delete(L, 5, last);
    cout << "Remove the not exists element 5" << endl;
    PrintLinklist(L);
    
    last = Delete(L, 1, last);
    cout << "Remove the element 1" << endl;
    PrintLinklist(L);
    
    cout << "add new element 8 after removing the previous one" << endl;
    last = Insert(L, 8, last);
    PrintLinklist(L);
    
    cout << "start to empty the list" << endl;
    last = Empty(L);
    PrintLinklist(L);
    cout << endl;
    cout << "after empty the list and you should see nothing above" << endl;

#ifdef WIN32
    int i;
    cin >> i;
#endif
    return 0;    
}
