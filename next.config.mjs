import { withContentlayer } from "next-contentlayer";
import Icons from "unplugin-icons/webpack";

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: "standalone",
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    webpack(config, { isServer }) {
        config.plugins.push(
            Icons({
                compiler: "jsx",
                jsx: "react",
            })
        );

        config.module.rules.push({
            test: /\.pdf$/,
            type: "asset/resource",
            generator: {
                filename: "static/chunks/[path][name].[hash][ext]",
            },
        });

        // Fix for dependencies that use Node.js modules in client code (e.g. decap-cms-app -> clean-stack)
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                "node:url": false,
                "node:path": false,
                "node:fs": false,
                fs: false,
                net: false,
                tls: false,
            };
        }

        return config;
    },
};

export default withContentlayer(nextConfig);
