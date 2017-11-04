
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
module.exports = {
  entry: {
	 app: './src/index.jsx'
  },
  //输出原始文件，便于在浏览器开发模式中查看
  devtool: 'source-map',
  module: {
     rules: [
	    //react编译加载。
	    {
            test: /\.js[x]?$/,
            exclude: /(node_modules|bower_components)/,
			use: [{
                    loader: "babel-loader",
                    options: { 
					   presets: ["react","es2015"],
					   //runtime配置，可以编译一些Objects.assign之类的函数
					   plugins:['transform-runtime']   
				    }
                }]
            
        },
       {
         test: /\.css$/,
         use:ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [   "css-loader",
		           {
					   //配置postcss处理css兼容问题。
                       loader:'postcss-loader',
                       options:{
                            ident:'postcss-ident',
                            plugins:function(){
                               return [
                                  require('autoprefixer')
                               ]
                           }
                        }
		            }//,
                    //"sass-loader"					
				]
        })
       },
	   {
         test: /\.(png|svg|jpg|gif)$/,
         use: [
		   {
			   loader:"url-loader",
			   options:{  
			       //超过多少字节才单独存放为文件
                   limit: '8192',
				   name:"[name].[hash:7].[ext]"
                }  
		   }
           
         ]
       },
       {
         test: /\.(woff|woff2|eot|ttf|otf)$/,
         use: [
           'file-loader'
         ]
       },
       {
         test: /\.(csv|tsv)$/,
         use: [
           'csv-loader'
         ]
       },
       {
         test: /\.xml$/,
         use: [
           'xml-loader'
         ]
       }
	   ]
  },
  
  plugins: [
     //清空dist文件目录
     new CleanWebpackPlugin(['dist']),
	 //抽取css
     new ExtractTextPlugin("[name].[contenthash:8].css"),
	 // 压缩提取出的 CSS，并解决ExtractTextPlugin分离出的 JS 重复问题
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
     
	 
     new HtmlWebpackPlugin({
       title:'react-demo',
       template: 'src/views/index.html', // 源模板文件,相对于context配置。没有配置，默认使用ejs-loader
       filename: './index.html'       //生成的html文件路径，相对于output.path
     }),
	 new webpack.NamedModulesPlugin(),
     new webpack.HotModuleReplacementPlugin(),
	 //定义环境变量
	 new webpack.DefinePlugin({
            'process.env': {
                 NODE_ENV: JSON.stringify('production')
              }
        }),
	 new UglifyJSPlugin({
		  sourceMap: true
	 })
   ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};