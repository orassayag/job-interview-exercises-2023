import settings from '../config/setting.config.js';

const getData = async (type) => {
  try {
    const response = await fetch(`${settings.DATA.BASE_URL}${type}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error', error);
  }
}

export default getData;