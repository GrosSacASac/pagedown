/**
 * Use JSX_SRC_DIR as base directory for the JSX source files.
 */
module.exports = {
    verbose: true,
    roots: ["<rootDir>/test"],
    setupFiles: ["./test/jestsetup.js"],
    snapshotSerializers: ["enzyme-to-json/serializer"],
    reporters: [
        "default",
        [ "jest-junit", {
            "suiteName": "ReactTests",
            "output": "./target/test-reports/jest-tests.xml",
            "classNameTemplate": "{classname}",
            "titleTemplate": "{title}",
            "ancestorSeparator": " › ",
            "usePathForSuiteName": "true"
        }
    ]],
};