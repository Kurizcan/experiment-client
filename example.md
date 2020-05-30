# 标题示例

Customers Who Never Order

# 描述示例

Suppose that a website contains two tables, the Customers table and the Orders table. Write a SQL query to find all customers who never order anything. Using the above tables as example, return the following:

# 答案示例

select customers.name as 'Customers' from customers where customers.id not in (select customerid from orders);

# 输入样例说明

输入样例包括两个字段

- headers：代表表的属性
    - table 数组代表表的名字
    - field 数组代表对应 table 索引的表的字段
- rows：数组代表 table 索引的表的数据

```json
{
    "headers": {
        "table": [
            "Customers",
            "Orders"
        ],
        "field": [
            [
                "Id",
                "Name"
            ],
            [
                "Id",
                "CustomerId"
            ]
        ]
    },
    "rows": [
        [
            [
                "1",
                "Joe"
            ],
            [
                "2",
                "Henry"
            ],
            [
                "3",
                "Sam"
            ],
            [
                "4",
                "Max"
            ]
        ],
        [
            [
                "1",
                "3"
            ],
            [
                "2",
                "1"
            ]
        ]
    ]
}
```

以上代表了这两个表

```
table: Customers.
+----+-------+   
| Id | Name  |
+----+-------+
| 1  | Joe   |
| 2  | Henry |
| 3  | Sam   |
| 4  | Max   |
+----+-------+

table: Orders.
+----+------------+
| Id | CustomerId |
+----+------------+
| 1  | 3          |
| 2  | 1          |
+----+------------+
```

# 输出样例说明

输出样例包括两个字段

- headers：代表输出结果的列属性
- rows：数组代表输出结果数据

```json
{
    "headers": [
        "Customers"
    ],
    "rows": [
        [
            "Henry"
        ],
        [
            "Max"
        ]
    ]
}
```

以上数据代表如下输出结果：

```
----------+
| Customers |
+-----------+
| Henry     |
| Max       |
+-----------+
```
