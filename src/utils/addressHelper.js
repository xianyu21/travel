/**
 * 地址数据处理工具
 * 将扁平化的地址数据转换为嵌套结构，提高查询效率
 */
import { ref } from 'vue'
import dataRegion from './address.json'

// 缓存键名
const ADDRESS_CACHE_KEY = 'address_data_cache'

/**
 * 预处理地址数据，将扁平结构转换为嵌套结构
 * @returns {object} 处理后的地址数据对象
 */
export function preprocessAddressData() {
  // 尝试从缓存获取
  try {
    const cachedData = uni.getStorageSync(ADDRESS_CACHE_KEY)
    if (cachedData) {
      return JSON.parse(cachedData)
    }
  }
  catch (e) {
    console.error('读取地址缓存失败', e)
  }

  // 缓存不存在或失效，重新处理数据
  const provinces = dataRegion.filter(el => el.regionLevel === 1 && el.parentId === 100000)

  // 构建嵌套结构
  const nestedData = {
    provinces: provinces.map((province) => {
      // 获取该省下的所有市
      const cities = dataRegion.filter(el => el.regionLevel === 2 && el.parentId === province.id)

      return {
        ...province,
        cities: cities.map((city) => {
          // 获取该市下的所有区县
          const districts = dataRegion.filter(el => el.regionLevel === 3 && el.parentId === city.id)

          return {
            ...city,
            districts,
          }
        }),
      }
    }),
  }

  // 添加辅助方法
  const result = {
    ...nestedData,
    // 获取所有省份
    getProvinces() {
      return this.provinces
    },
    // 根据省ID获取所有市
    getCities(provinceId) {
      const province = this.provinces.find(p => p.id === provinceId)
      return province ? province.cities : []
    },
    // 根据市ID获取所有区县
    getDistricts(cityId) {
      for (const province of this.provinces) {
        const city = province.cities.find(c => c.id === cityId)
        if (city) {
          return city.districts
        }
      }
      return []
    },
    // 根据ID获取省份信息
    getProvince(provinceId) {
      return this.provinces.find(p => p.id === provinceId)
    },
    // 根据ID获取城市信息
    getCity(cityId) {
      for (const province of this.provinces) {
        const city = province.cities.find(c => c.id === cityId)
        if (city) {
          return city
        }
      }
      return null
    },
    // 根据ID获取区县信息
    getDistrict(districtId) {
      for (const province of this.provinces) {
        for (const city of province.cities) {
          const district = city.districts.find(d => d.id === districtId)
          if (district) {
            return district
          }
        }
      }
      return null
    },
  }

  // 存入缓存
  try {
    uni.setStorageSync(ADDRESS_CACHE_KEY, JSON.stringify(result))
  }
  catch (e) {
    console.error('缓存地址数据失败', e)
  }

  return result
}

// 创建地址数据实例
const addressData = preprocessAddressData()

/**
 * 获取地址选择器初始列数据
 * @returns {Array} 地址选择器列数据
 */
export function getAddressColumns() {
  return [addressData.getProvinces()]
}

/**
 * 处理地址选择器列变化
 * @param {object} selectedItem 选中项信息
 * @param {Function} resolve 解析函数，用于更新列数据
 * @param {Function} finish 完成函数，用于结束选择
 * @param {object} formData 表单数据对象
 */
export function handleColumnChange(selectedItem, resolve, finish, formData) {
  const { columnIndex, selectedValue } = selectedItem

  if (columnIndex === 0) {
    // 选择了省，更新市列表
    const provinceId = selectedValue.id
    formData.province = selectedValue.regionName
    formData.provinceId = provinceId

    // 获取该省下的所有市
    const cities = addressData.getCities(provinceId)
    resolve(cities)

    if (cities.length > 0) {
      // 默认选中第一个市
      formData.city = cities[0].regionName
      formData.cityId = cities[0].id

      // 获取第一个市下的所有区县
      const districts = addressData.getDistricts(cities[0].id)
      if (districts.length > 0) {
        formData.county = districts[0].regionName
        formData.countyId = districts[0].id
      }
    }
  }
  else if (columnIndex === 1) {
    // 选择了市，更新区县列表
    const cityId = selectedValue.id
    formData.city = selectedValue.regionName
    formData.cityId = cityId

    // 获取该市下的所有区县
    const districts = addressData.getDistricts(cityId)
    resolve(districts)

    if (districts.length > 0) {
      // 默认选中第一个区县
      formData.county = districts[0].regionName
      formData.countyId = districts[0].id
    }
  }
  else if (columnIndex === 2) {
    // 选择了区县
    formData.county = selectedValue.regionName
    formData.countyId = selectedValue.id

    // 更新地址字符串
    formData.address = `${formData.province}${formData.city}${formData.county}`

    finish()
  }
}

/**
 * 初始化地址数据
 * @param {object} formData 表单数据对象
 */
export function initAddressData(formData) {
  const provinces = addressData.getProvinces()
  if (provinces.length > 0) {
    // 默认选择第一个省
    formData.province = provinces[0].regionName
    formData.provinceId = provinces[0].id

    // 获取该省下的所有市
    const cities = addressData.getCities(provinces[0].id)
    if (cities.length > 0) {
      // 默认选择第一个市
      formData.city = cities[0].regionName
      formData.cityId = cities[0].id

      // 获取该市下的所有区县
      const districts = addressData.getDistricts(cities[0].id)
      if (districts.length > 0) {
        // 默认选择第一个区县
        formData.county = districts[0].regionName
        formData.countyId = districts[0].id

        // 更新地址字符串
        formData.address = `${formData.province}${formData.city}${formData.county}`
      }
    }
  }
}

export default {
  addressData,
  getAddressColumns,
  handleColumnChange,
  initAddressData,
}
