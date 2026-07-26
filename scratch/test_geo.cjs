const axios = require('axios');

async function testGeo() {
  console.log('Testing Geolocation APIs...\n');

  // 1. Test ipapi.co
  try {
    const res = await axios.get('https://ipapi.co/json/');
    console.log('--- ipapi.co ---');
    console.log(`IP: ${res.data.ip}`);
    console.log(`City: ${res.data.city}`);
    console.log(`Region: ${res.data.region}`);
    console.log(`Country: ${res.data.country_name}`);
    console.log(`Org: ${res.data.org}`);
  } catch (e) {
    console.error('ipapi.co failed:', e.message);
  }

  console.log('\n---------------------------------\n');

  // 2. Test freeipapi.com
  try {
    const res = await axios.get('https://freeipapi.com/api/json');
    console.log('--- freeipapi.com ---');
    console.log(`IP: ${res.data.ipAddress}`);
    console.log(`City: ${res.data.cityName}`);
    console.log(`Region: ${res.data.regionName}`);
    console.log(`Country: ${res.data.countryName}`);
  } catch (e) {
    console.error('freeipapi.com failed:', e.message);
  }

  console.log('\n---------------------------------\n');

  // 3. Test ipinfo.io
  try {
    const res = await axios.get('https://ipinfo.io/json');
    console.log('--- ipinfo.io ---');
    console.log(`IP: ${res.data.ip}`);
    console.log(`City: ${res.data.city}`);
    console.log(`Region: ${res.data.region}`);
    console.log(`Country: ${res.data.country}`);
    console.log(`Org: ${res.data.org}`);
  } catch (e) {
    console.error('ipinfo.io failed:', e.message);
  }
}

testGeo().catch(console.error);
