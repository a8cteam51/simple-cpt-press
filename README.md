# Press Items Plugin

Welcome to the Press Items Plugin, a custom plugin for managing press items in WordPress. This plugin allows you to create and manage press items with specific fields and categories.

## Getting Started
The plugin creates a new CPT called Press Items with a Press Type category

![imagen](https://github.com/user-attachments/assets/933e478d-3bb9-4521-8579-4d858b610fa2)

![imagen](https://github.com/user-attachments/assets/8bd73d3f-f8dc-4b36-96f0-db7e62ce02b7)

A press item could be either internal or external:

- Internal: Have blocks stored in the page content and doesn't have a Press Link
- External: Doesn't need block content, but must have a Press Link

**NOTE:** `When an external press item is visited, it will be redirected to the external source`

### Editing a Press Item

The press item information must be added in the item sidebar

![imagen](https://github.com/user-attachments/assets/adc5fa14-ab17-4a23-931f-80ac73f8866b)

All press items require: content and outlet. The excerpt, cover image, author, and link are optional

![imagen](https://github.com/user-attachments/assets/d26e67b2-4ea1-41ca-9615-7b080c1349c4)

**IMPORTANT:** `If the press item is external, the link is required and the content is optional`

If required fields are missing, the press item can't be saved
![imagen](https://github.com/user-attachments/assets/d9242fce-0b59-4ef3-8a70-13ea6659e2d6)

### Press Item Template
The plugin creates a Singles Press template to show the internal press items

![imagen](https://github.com/user-attachments/assets/5cc8b3cc-a507-44f7-8162-57fb1486a1c1)

It also adds a some patterns that can be added anywhere

![imagen](https://github.com/user-attachments/assets/e433cfa2-36a1-4b52-835a-1f6c7bab6cb6)

### Press Release fields Block
The pattern uses a new block "Press Release fields" to show either the **Press Outlet** or the **Press Author**
![imagen](https://github.com/user-attachments/assets/7e391e0d-74d6-4a24-9135-124729fce810)

This block allows the addition of Prefix and Suffix

![imagen](https://github.com/user-attachments/assets/200aac1a-d158-4457-8d2c-bd210457279e)
![imagen](https://github.com/user-attachments/assets/9fbdfa92-4a12-43d7-bef2-5790b176cefb)

The block works with the new no-reload query option

![imagen](https://github.com/user-attachments/assets/4d1a6db2-13e7-4b35-9c87-54d2727883af)


## Installation

The zipped plugin can be downloaded directly from trunk and installed in the WordPress admin panel


