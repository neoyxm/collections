#include <iostream>
#include <stack>

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

enum TreeBrowseType{
   PreTreeBrowseType,  
   CenterTreeBrowseType,  
   AfterTreeBrowseType,  
}; 

void TreeBrowse_non_recur(PTNode pNode, TreeBrowseType eBrowseType)
{
    if(!pNode)
        return;

    stack<PTNode> node_stack;

    PTNode curr_node = pNode;
   
    while(curr_node || !node_stack.empty())
    {
        while(curr_node)
        {
            node_stack.push(curr_node);
            if(PreTreeBrowseType == eBrowseType)
               cout << curr_node->data << " ";
            curr_node = curr_node->l;
        }

        if(!node_stack.empty())
        {
           curr_node =  node_stack.top();
           if(CenterTreeBrowseType == eBrowseType)
               cout << curr_node->data << " ";
           curr_node =  curr_node->r;
           node_stack.pop();
        }
    }
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
    cout << "PreOrder-non_recur:"<< endl;
    TreeBrowse_non_recur(p, PreTreeBrowseType);
    cout << endl << endl;

    cout << "CenterOrder:"<< endl;
    centerOrderBrowse(p);
    cout << endl;
    cout << "CenterOrder-non_recur:"<< endl;
    TreeBrowse_non_recur(p, CenterTreeBrowseType);
    cout << endl << endl;

    cout << "AfterOrder:"<< endl;
    afterOrderBrowse(p);
    cout << endl;
    
    int i;
    cin >> i;

    return 0;   
}
