
let winstonMock = {
  createLogger: () => {
    return {
      add: () => { },
      info: (info) => global.console.log(info),
      error: (info) => global.console.error(info)
    }
  },
  format: {
    json: () => {},
    simple: () => {}
  },
  transports: { }
}

winstonMock.transports.File = class File { }
winstonMock.transports.Console = class Console { }

module.exports = winstonMock
