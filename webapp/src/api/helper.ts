export const RandomID = () => {
  const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const N = 8;
  return Array.from(crypto.getRandomValues(new Uint8Array(N)))
    .map((n) => S[n % S.length])
    .join("");
};

export const generateRandomNumberInRange = (): number => {
  const randomValue = Math.random() * 0.000045;
  const result = randomValue + 0.999987;
  return result;
};

export const saveToCache = <T>(key: string, data: T) => {
  const now = new Date().getTime();
  const item = {
    value: data,
    expiry: now + 24 * 60 * 60 * 1000,
  };
  localStorage.setItem(key, JSON.stringify(item));
};

export const loadFromCache = (key: string) => {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date().getTime();

  if (now > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
};

export const rangePos = (
  lat: number,
  lng: number,
  pos: { lat: number; lng: number }
) => {
  const latRange = 0.0005;
  return (
    lat + latRange > pos.lat &&
    lat - latRange < pos.lat &&
    lng + latRange > pos.lng &&
    lng - latRange < pos.lng
  );
};


export const isExtensionValid = (fileName: string) => {
  const validExtensions = [".jpg", ".jpeg", ".png", ".JPG", ".JPEG", ".PNG"];
  const extension = fileName.slice(fileName.lastIndexOf("."));
  return validExtensions.includes(extension);
};

export const imageResize = (image: string) => {
  return new Promise((resolve) => {
    let base64;
    const img = new Image();
    img.src = image;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const MAX_WIDTH = 500;
      const MAX_HEIGHT = 500;
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }

      canvas.width = width;
      canvas.height = height;

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, width, height);

      const resizedImage = canvas.toDataURL("image/jpeg");
      base64 = resizedImage;
      resolve(base64);
    };
  });
};

export const imagePath = (id: string) => {
  return `https://firebasestorage.googleapis.com/v0/b/maizou-7805e.appspot.com/o/${id}.jpg?alt=media`
}