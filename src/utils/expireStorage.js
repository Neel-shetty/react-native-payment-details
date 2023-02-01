import * as SecureStore from "expo-secure-store";

const setItem = async (key, value, expire = null) => {
  try {
    const expireDate = createExpiredDate(expire),
      saveData = {
        saveTime: new Date(),
        expireDate,
        value,
      };

    return await SecureStore.setItemAsync(key, JSON.stringify(saveData));
  } catch (e) {
    return e;
  }
};

const getItem = async (key) => {
  try {
    const result = await SecureStore.getItemAsync(key);

    return checkCacheData(result, key);
  } catch (e) {
    return e;
  }
};

const removeItem = async (key) => {
    try {
        return await SecureStore.deleteItemAsync(key);
    } catch (e) {
        return e;
    }
};


function createExpiredDate(expire) {
  // if expire is 0 or undefined or null, return null
  if (!expire) {
    return null;
  }

  const seconds = expire * 1000, // transfer second to millisecond
    expiredTime = new Date().getTime() + seconds;

  return new Date(expiredTime);
}

function checkCacheData(result, key) {
  if (!result) {
    return null;
  }

  try {
    const data = JSON.parse(result);

    // is expired
    if (checkExpireDate(data.expireDate)) {
      // remove data
      removeItem(key);
      return null;
    }

    return data.value;
  } catch (e) {
    return e;
  }
}

/**
 * Check expireDate
 * @param {string} expireDate
 */
function checkExpireDate(expireDate) {
  if (!expireDate) {
    return false;
  }

  const currentTime = new Date().getTime(),
    expiredTime = new Date(expireDate).getTime();

  return expiredTime < currentTime;
}

export default {
  setItem,
  getItem,
  removeItem,
}