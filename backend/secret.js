const secret = {
  dbUri: 'mongodb://user:qwerty123@ds151393.mlab.com:51393/imagesdb'
};

export const getSecret = key => secret[key];