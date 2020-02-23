# Greenlist Registry (back end) (full-stack app)

Designers, especially independent and small designers, lack a centralized resource to find, research, and even discover eco-friendly sustainable materials they can use.

Greenlist Registry aims to be an official registry, directory, and forum for designers and brands to find providers and suppliers of green materials. As well as serve as a networking vessel for material reclaim.

## Table of Contents

- [Database Schema](#ii-database-schema)
- [Endpoints](#iii-endpoints)

## Repos

- [Back End](https://github.com/joseph-p-pasaoa/greenlistRegistry_back__Web) (this repo)
- [Front End](https://github.com/joseph-p-pasaoa/greenlistRegistry_front__Web)

## Developers

- **Aransa Garcia, Joseph P. Pasaoa, Kathy Puma, and Sergio Salama**

## Instructional Team

- **LEAD Instructor:** [Alejandro Franco -- ( @alejo4373 )](https://github.com/alejo4373)
- **IA:** [Jung Rae Jang -- ( @jungraejang )](https://github.com/jungraejang)
- **IA:** [Wynter Reid -- ( @wynterreid )](https://github.com/wynterreid)

## Developers' Notes

### **I. Wireframes**

![Wireframe PDF](./README/wireframes.pdf)

### **II. Database SCHEMA**

![schema diagram](./readme/database-schema.png)

  - **Creators**
    - id
    - username - _Unique, Not Null_
    - firstname - _Not Null_
    - lastname - _Not Null_
    - password - _Not Null_
    - about
    - avatar_url
    - phone
    - email - _Unique, Not Null_
    - website
    - address

  - **Resources**
    - id
    - company name - _Unique, Not Null_
    - about
    - avatar_url
    - phone number
    - email - _Unique, Not Null_
    - website
    - address

  - **Products**
    - id
    - name - _Not Null_
    - body - _Not Null_
    - resourcer_id - _References Resourcers + On Delete Cascade_
    - material_id - _References Materials_

  - **Reclaims**
    - id
    - name - _Not Null_
    - quantity - _Not Null_
    - body - _Not Null_
    - creator_id - _References Creators + On Delete Cascade_
    - is_need - _Boolean_

  - **Materials**
    - id
    - name - _Not Null_
    - description - _Not Null_

  - **Photos**
    - id
    - title - _Not Null_
    - caption
    - url - _Not Null_
    - reclaim_id - _References Reclaims + On Delete Cascade_

---

### **III. ENDPOINTS**

- **Creators**

  | Method | Endpoint        | Description              | Body Data                                                                                                         |
  | ------ | --------------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------- |
  | GET    | `/creators`     | Get all creators         | n/a                                                                                                               |
  | GET    | `/creators/:id` | Get single creator by id | n/a                                                                                                               |
  | POST   | `/creators/add`    | Add new creator          | `username`, `firstname`, `lastname`, `password`, `avatar_url`, `phone_number`, `address`, `email`, `website`, `about` |
  | PATCH | `/creators/edit`    | Update creator Info      | `username`, `firstname`, `lastname`, `password`, `avatar_url`, `phone_number`, `address`, `email`, `website`, `about`  |

* **Resources** 

  | Method | Endpoint         | Description                | Body Data                                                                                    |
  | ------ | ---------------- | -------------------------- | -------------------------------------------------------------------------------------------- |
  | GET    | `/resources`     | Get all resources          | n/a                                                                                          |
  | GET    | `/resources/:id` | Get single resource by id | n/a                                                                                          |
  | POST   | `/resources/add`    | Add new resources          | `company_name`, `avatar_url`, `about`, `passowrd`, `phone_number`, `address`, `email`, `website` |
  | PATCH | `/resources/edit`    | Update creator Info        | `username`, `avatar_url`, `about`, `phone_number`, `address`, `email`, `website`, `about`       |

- **Products**

  | Method | Endpoint                   | Description                  | BodyData                                      |
  | ------ | -------------------------- | ---------------------------- | --------------------------------------------- |
  | GET    | `/products`                | Get all products             | n/a                                           |
  | GET    | `/products/:resource_id` | Get product by resource ID | n/a                                           |
  | POST   | `/products/add`                | ADD new Product              | `name`, `body`, `resource_id`, `material_id` |
  | DELETE | `/products/delete/:id`            | Delete single product by ID  | n/a                                           |

- **Reclaims**

  | Method | Endpoint                   | Description                  | BodyData                                                         |
  | ------ | -------------------------- | ---------------------------- | ---------------------------------------------------------------- |
  | GET    | `/reclaims`                | Get all reclaims             | n/a                                                              |
  | GET    | `/reclaims/:resource_id` | Add new reclaim              | n/a                                                              |
  | POST   | `/reclaims/add`                | ADD new reclaim              | `name`, `body`, `quantity_num`, `quantity_label`, `time_created`, `creator_id`, `is_need` |
  | DELETE | `/reclaims/delete/:id`            | Delete reclaim product by ID | n/a                                                              |

* **Materials**

  | Method | Endpoint         | Description       | Body Data |
  | ------ | ---------------- | ----------------- | --------- |
  | GET    | `/materials`     | Get all materials | n/a       |
  | GET    | `/materials/:id` | get all by ID     | n/a       |

* **Photos**
​
  | Method | Endpoint              | Description           | Body Data |
  | ------ | --------------------- | --------------------- | --------- |
  | GET    | `/photos`             | Get all photos        | n/a       |
  | GET    | `/photos/:reclaim_id` | Get all by reclaim_id | n/a       |
  | POST   | `/photos/add/`        | Add new photo         | `title`, `caption`, `url`       |
  | DELETE | `/photos/delete/:id`         | Delete photo          | n/a       |
