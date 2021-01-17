import path from "path";
import webpack, {Configuration} from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";

const webpackConfig = (env): Configuration => ({
    entry: "./src/index.tsx",
    ...(env.production || !env.development ? {} : {devtool: "eval-source-map"}),
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        //@ts-ignore
        plugins: [new TsconfigPathsPlugin()]
    },
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "build.js"
    },
    devServer: {
        historyApiFallback: true,
      },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                options: {
                    transpileOnly: true
                },
                exclude: /dist/
            },
            {
                test: /\.css$/,
                use: [
                  'style-loader',
                  'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
                exclude: /node_modules/,
                use: ['file-loader?name=[name].[ext]'] // ?name=[name].[ext] is only necessary to preserve the original file name
              }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            filename: "index.html"
        }),
        new webpack.DefinePlugin({
            "process.env.PRODUCTION": env.production || !env.development,
            "process.env.NAME": JSON.stringify(require("./package.json").name),
            "process.env.VERSION": JSON.stringify(require("./package.json").version)
        }),
        new ForkTsCheckerWebpackPlugin({
            eslint: {
                files: "./src/**/*.{ts,tsx,js,jsx}" // required - same as command `eslint ./src/**/*.{ts,tsx,js,jsx} --ext .ts,.tsx,.js,.jsx`
            }
        })
    ]
});

export default webpackConfig;