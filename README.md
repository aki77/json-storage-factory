# json-storage-factory

## Usage

```javascript
import jsonStorageFactory from 'json-storage-factory'

const storage = jsonStorageFactory(() => localStorage)

function save(id, user) {
  storage.setItem(id, user)
}

function load(id) {
  storage.getItem(id)
}

function remove(id) {
  storage.removeItem(id)
}
```
