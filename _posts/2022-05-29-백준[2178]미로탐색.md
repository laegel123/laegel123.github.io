---
layout: post
title: 백준[2178]미로 탐색
subtitle: dfs와 bfs 문제풀이
categories: Algorithm_solve
tags: [BFS, Algorithm]
---

## BOJ 미로탐색 - 2178번

이번 문제는 (N,M) 위치로 이동할 때 지나야 하는 **최소의 칸 수** 를 구하는 문제로
bfs 알고리즘을 선택하면 된다.



~~~java
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.LinkedList;
import java.util.Queue;
import java.util.StringTokenizer;

public class Main {

    static int[][] maze;
    static boolean[][] visited;

    static int width = 0;
    static int length = 0;

    static int[] dx = {0, 1, 0, -1};
    static int[] dy = {1, 0, -1, 0};

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());

        width = Integer.parseInt(st.nextToken());
        length = Integer.parseInt(st.nextToken());

        maze = new int[width][length];
        visited = new boolean[width][length];

        for (int i = 0; i < width; i++) {
            String[] str = br.readLine().split("");

            for (int j = 0; j < length; j++) {
                maze[i][j] = Integer.parseInt(str[j]);
            }
        }

        bfs(0, 0);

        System.out.println(maze[width-1][length-1]);


    }

    public static void bfs(int i, int j) {
        Queue<int[]> q = new LinkedList<>();
        q.offer(new int[]{i, j});

        while (!q.isEmpty()) {
            int[] xY = q.poll();

            for (int x = 0; x < dx.length; x++) {
                int nowX = xY[0] + dx[x];
                int nowY = xY[1] + dy[x];

                if (nowX >= width || nowX < 0 || nowY >= length || nowY < 0) {
                    continue;
                }

                if (visited[nowX][nowY] || maze[nowX][nowY] == 0) {
                    continue;
                }

                visited[nowX][nowY] = true;
                q.offer(new int[]{nowX, nowY});
                maze[nowX][nowY] = maze[xY[0]][xY[1]] + 1;

            }
        }


    }
}

~~~

