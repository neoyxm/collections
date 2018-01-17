#include <iostream>

using namespace std;

struct TNode{
    char data;
    struct TNode *l;
    struct TNode *r;
};

typedef TNode* PTNode; 
typedef TNode* Tree;

void preOrderBrowse(PTNode pNode)
{
    if (!pNode)
        return;
    cout << pNode->data << " ";
    preOrderBrowse(pNode->l);
    preOrderBrowse(pNode->r);
}

void centerOrderBrowse(PTNode pNode)
{
    if (!pNode)
        return;
    centerOrderBrowse(pNode->l);
    cout << pNode->data<< " ";
    centerOrderBrowse(pNode->r);
}

void afterOrderBrowse(PTNode pNode)
{
    if (!pNode)
        return;
    afterOrderBrowse(pNode->l);
    afterOrderBrowse(pNode->r);
    cout << pNode->data << " ";
}
int main()
{
    TNode g = { 'g', NULL, NULL };
    TNode f = { 'f', &g, NULL };
    TNode e = { 'e', NULL, NULL };
    TNode d = { 'd', NULL, &e };
    TNode c = { 'c', NULL, NULL };
    TNode b = {'b', &d, &f};
    TNode a = {'a', &b, &c};
    
    Tree p = &a;
    
    cout << "PreOrder:"<< endl;
    preOrderBrowse(p);
    cout << endl;
    cout << "CenterOrder:"<< endl;
    centerOrderBrowse(p);
    cout << endl;
    cout << "AfterOrder:"<< endl;
    afterOrderBrowse(p);
    cout << endl;
    
    int i;
    cin >> i;

    return 0;   
}
