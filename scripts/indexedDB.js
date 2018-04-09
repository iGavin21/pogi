

var tDB = {};
var datastore = null;
    
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

// Open (or create) the database
var open = indexedDB.open("b", 1);

// Create the schema
open.onupgradeneeded = function() {
    var db = open.result;
    if (db.objectStoreNames.contains('cafe')) {
        db.deleteObjectStore('cafe');
      }

      // Create a new datastore.
    var store = db.createObjectStore('cafe', {
        keyPath: 'cafeId'});
    var store2 = db.createObjectStore("menu", {keyPath: "menuId"});
};

open.onsuccess = function() {
    // Start a new transaction
    var db = open.result;
    var trans = db.transaction("cafe", "readwrite");
    var trans2 = db.transaction("menu", "readwrite");
    var storeCafe = trans.objectStore("cafe");
    var storeMenu = trans2.objectStore("menu");
    
    addCafeData(storeCafe, 1, "cafe1", "yes", "cozy");
    addMenuData(storeMenu, 1, 1, "c1Menu1", "dessert", 500);
    addMenuData(storeMenu, 2, 1, "c1Menu1", "dessert", 500);
    addMenuData(storeMenu, 3, 1, "c1Menu1", "dessert", 500);
    
    addCafeData(storeCafe, 2, 1, "cafe2", "yes", "cozy");
    addMenuData(storeMenu, 4, 2, "c1Menu1", "dessert", 500);
    addMenuData(storeMenu, 5, 2, "c1Menu1", "dessert", 500);
    addMenuData(storeMenu, 6, 2, "c1Menu1", "dessert", 500);
    
    
    var getData = storeCafe.get(2);
    getData.onsuccess = function() {
        console.log(getData.result); 
    }

    // Close the db when the transaction is done
    trans.oncomplete = function() {
        db.close();
    };
}

function addCafeData(store, id, name, wifi, ambience){
    store.put({cafeId: id, name: name, wifi: wifi, ambience: ambience});
}

function addMenuData(store, id, cafeId, menuName, menuType, menuPrice){
    store.put({menuId: id, cafeId: cafeId, menuName: menuName, menuType: menuType, menuPrice: menuPrice});
}
