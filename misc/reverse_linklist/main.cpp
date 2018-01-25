#include <iostream>

using namespace std;

struct LinkNode{
    int data;
    struct LinkNode *next;
};

void print_node_reverse(const LinkNode* node)
{
    if(!node)
        return;

    if(node->next)
    {
        print_node_reverse(node->next);
    }

    cout << node->data << endl;
}

int main()
{
    LinkNode d = {4, NULL};
    LinkNode c = {3, &d};
    LinkNode b = {2, &c};
    LinkNode a = {1, &b};

    print_node_reverse(&a);
    return 0;
}
