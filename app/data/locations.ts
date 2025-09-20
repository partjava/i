// 定义位置选项类型
export interface LocationOption {
  value: string;
  label: string;
}

// 完整的中国省份数据
export const COUNTRIES: LocationOption[] = [
  { value: '中国', label: '中国' },
  { value: '美国', label: '美国' },
  { value: '日本', label: '日本' }
];

// 完整的中国省份
export const PROVINCES: Record<string, LocationOption[]> = {
  '中国': [
    { value: '北京市', label: '北京市' },
    { value: '天津市', label: '天津市' },
    { value: '河北省', label: '河北省' },
    { value: '山西省', label: '山西省' },
    { value: '内蒙古自治区', label: '内蒙古自治区' },
    { value: '辽宁省', label: '辽宁省' },
    { value: '吉林省', label: '吉林省' },
    { value: '黑龙江省', label: '黑龙江省' },
    { value: '上海市', label: '上海市' },
    { value: '江苏省', label: '江苏省' },
    { value: '浙江省', label: '浙江省' },
    { value: '安徽省', label: '安徽省' },
    { value: '福建省', label: '福建省' },
    { value: '江西省', label: '江西省' },
    { value: '山东省', label: '山东省' },
    { value: '河南省', label: '河南省' },
    { value: '湖北省', label: '湖北省' },
    { value: '湖南省', label: '湖南省' },
    { value: '广东省', label: '广东省' },
    { value: '广西壮族自治区', label: '广西壮族自治区' },
    { value: '海南省', label: '海南省' },
    { value: '重庆市', label: '重庆市' },
    { value: '四川省', label: '四川省' },
    { value: '贵州省', label: '贵州省' },
    { value: '云南省', label: '云南省' },
    { value: '西藏自治区', label: '西藏自治区' },
    { value: '陕西省', label: '陕西省' },
    { value: '甘肃省', label: '甘肃省' },
    { value: '青海省', label: '青海省' },
    { value: '宁夏回族自治区', label: '宁夏回族自治区' },
    { value: '新疆维吾尔自治区', label: '新疆维吾尔自治区' },
    { value: '台湾省', label: '台湾省' },
    { value: '香港特别行政区', label: '香港特别行政区' },
    { value: '澳门特别行政区', label: '澳门特别行政区' }
  ],
  '美国': [
    { value: '加利福尼亚州', label: '加利福尼亚州' },
    { value: '纽约州', label: '纽约州' }
  ]
};

// 更新后的城市数据 - 每个省份至少包含3个主要城市
export const CITIES: Record<string, LocationOption[]> = {
  '北京市': [
    { value: '东城区', label: '东城区' },
    { value: '西城区', label: '西城区' },
    { value: '朝阳区', label: '朝阳区' },
    { value: '海淀区', label: '海淀区' }
  ],
  '天津市': [
    { value: '和平区', label: '和平区' },
    { value: '河东区', label: '河东区' },
    { value: '河西区', label: '河西区' }
  ],
  '河北省': [
    { value: '石家庄市', label: '石家庄市' },
    { value: '唐山市', label: '唐山市' },
    { value: '秦皇岛市', label: '秦皇岛市' }
  ],
  '山西省': [
    { value: '太原市', label: '太原市' },
    { value: '大同市', label: '大同市' },
    { value: '临汾市', label: '临汾市' }
  ],
  '内蒙古自治区': [
    { value: '呼和浩特市', label: '呼和浩特市' },
    { value: '包头市', label: '包头市' },
    { value: '赤峰市', label: '赤峰市' }
  ],
  '辽宁省': [
    { value: '沈阳市', label: '沈阳市' },
    { value: '大连市', label: '大连市' },
    { value: '鞍山市', label: '鞍山市' }
  ],
  '吉林省': [
    { value: '长春市', label: '长春市' },
    { value: '吉林市', label: '吉林市' },
    { value: '延边朝鲜族自治州', label: '延边朝鲜族自治州' }
  ],
  '黑龙江省': [
    { value: '哈尔滨市', label: '哈尔滨市' },
    { value: '大庆市', label: '大庆市' },
    { value: '齐齐哈尔市', label: '齐齐哈尔市' }
  ],
  '上海市': [
    { value: '黄浦区', label: '黄浦区' },
    { value: '浦东新区', label: '浦东新区' },
    { value: '徐汇区', label: '徐汇区' }
  ],
  '江苏省': [
    { value: '南京市', label: '南京市' },
    { value: '苏州市', label: '苏州市' },
    { value: '无锡市', label: '无锡市' }
  ],
  '浙江省': [
    { value: '杭州市', label: '杭州市' },
    { value: '宁波市', label: '宁波市' },
    { value: '温州市', label: '温州市' }
  ],
  '安徽省': [
    { value: '合肥市', label: '合肥市' },
    { value: '芜湖市', label: '芜湖市' },
    { value: '蚌埠市', label: '蚌埠市' }
  ],
  '福建省': [
    { value: '福州市', label: '福州市' },
    { value: '厦门市', label: '厦门市' },
    { value: '泉州市', label: '泉州市' }
  ],
  '江西省': [
    { value: '南昌市', label: '南昌市' },
    { value: '九江市', label: '九江市' },
    { value: '赣州市', label: '赣州市' }
  ],
  '山东省': [
    { value: '济南市', label: '济南市' },
    { value: '青岛市', label: '青岛市' },
    { value: '烟台市', label: '烟台市' }
  ],
  '河南省': [
    { value: '郑州市', label: '郑州市' },
    { value: '洛阳市', label: '洛阳市' },
    { value: '南阳市', label: '南阳市' }
  ],
  '湖北省': [
    { value: '武汉市', label: '武汉市' },
    { value: '宜昌市', label: '宜昌市' },
    { value: '襄阳市', label: '襄阳市' }
  ],
  '湖南省': [
    { value: '长沙市', label: '长沙市' },
    { value: '株洲市', label: '株洲市' },
    { value: '湘潭市', label: '湘潭市' }
  ],
  '广东省': [
    { value: '广州市', label: '广州市' },
    { value: '深圳市', label: '深圳市' },
    { value: '东莞市', label: '东莞市' },
    { value: '佛山市', label: '佛山市' }
  ],
  '广西壮族自治区': [
    { value: '南宁市', label: '南宁市' },
    { value: '柳州市', label: '柳州市' },
    { value: '桂林市', label: '桂林市' }
  ],
  '海南省': [
    { value: '海口市', label: '海口市' },
    { value: '三亚市', label: '三亚市' },
    { value: '儋州市', label: '儋州市' }
  ],
  '重庆市': [
    { value: '渝中区', label: '渝中区' },
    { value: '江北区', label: '江北区' },
    { value: '渝北区', label: '渝北区' }
  ],
  '四川省': [
    { value: '成都市', label: '成都市' },
    { value: '绵阳市', label: '绵阳市' },
    { value: '宜宾市', label: '宜宾市' }
  ],
  '贵州省': [
    { value: '贵阳市', label: '贵阳市' },
    { value: '遵义市', label: '遵义市' },
    { value: '毕节市', label: '毕节市' }
  ],
  '云南省': [
    { value: '昆明市', label: '昆明市' },
    { value: '曲靖市', label: '曲靖市' },
    { value: '玉溪市', label: '玉溪市' }
  ],
  '西藏自治区': [
    { value: '拉萨市', label: '拉萨市' },
    { value: '日喀则市', label: '日喀则市' },
    { value: '昌都市', label: '昌都市' }
  ],
  '陕西省': [
    { value: '西安市', label: '西安市' },
    { value: '宝鸡市', label: '宝鸡市' },
    { value: '咸阳市', label: '咸阳市' }
  ],
  '甘肃省': [
    { value: '兰州市', label: '兰州市' },
    { value: '天水市', label: '天水市' },
    { value: '酒泉市', label: '酒泉市' }
  ],
  '青海省': [
    { value: '西宁市', label: '西宁市' },
    { value: '海东市', label: '海东市' },
    { value: '海西蒙古族藏族自治州', label: '海西蒙古族藏族自治州' }
  ],
  '宁夏回族自治区': [
    { value: '银川市', label: '银川市' },
    { value: '石嘴山市', label: '石嘴山市' },
    { value: '吴忠市', label: '吴忠市' }
  ],
  '新疆维吾尔自治区': [
    { value: '乌鲁木齐市', label: '乌鲁木齐市' },
    { value: '克拉玛依市', label: '克拉玛依市' },
    { value: '吐鲁番市', label: '吐鲁番市' }
  ],
  '台湾省': [
    { value: '台北市', label: '台北市' },
    { value: '新北市', label: '新北市' },
    { value: '台中市', label: '台中市' }
  ],
  '香港特别行政区': [
    { value: '香港岛', label: '香港岛' },
    { value: '九龙', label: '九龙' },
    { value: '新界', label: '新界' }
  ],
  '澳门特别行政区': [
    { value: '澳门半岛', label: '澳门半岛' },
    { value: '氹仔', label: '氹仔' },
    { value: '路环', label: '路环' }
  ]
};

// 根据国家获取省份
export const getProvincesByCountry = (country: string): LocationOption[] => {
  return PROVINCES[country] || [];
};

// 根据省份获取城市
export const getCitiesByProvince = (province: string): LocationOption[] => {
  return CITIES[province] || [];
}; 