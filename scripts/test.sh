#!/bin/bash

tests=("InsertionSort" "PrimsList" "RingBuffer" "LRU" "LinearSearchList" "BinarySearchList" "TwoCrystalBalls" "BubbleSort" "SinglyLinkedList" "DoublyLinkedList" "Queue" "Stack" "ArrayList" "MazeSolver" "MergeSort" "QuickSort" "BTPreOrder" "BTInOrder" "BTPostOrder" "BTBFS" "DijkstraList" "CompareBinaryTrees" "DFSOnBST" "DFSGraphList" "Trie" "BFSGraphMatrix" "Map" "MinHeap")

echo "${tests[@]}" | tr ' ' '\n' | fzf --margin 10% --border=rounded --border-label="Tests" --border-label-pos=bottom | xargs bun --watch test
