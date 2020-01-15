module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        // 配置别名 这样可不通过写具体路径找资源
        // vue设置了 '@': 'src',
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}
