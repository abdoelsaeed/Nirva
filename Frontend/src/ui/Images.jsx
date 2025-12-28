function Images({ imageCover, images }) {
  console.log(imageCover);
  console.log(images);
  return (
    <div className="flex-col flex-2">
      {images.length > 0 ? (
        images.map((image) => (
          <img
            src={image.url}
            alt="productImage"
            className="w-[600px] h-[600px] mb-8"
          />
        ))
      ) : (
        <img
          src={imageCover}
          alt="productImage"
          className="w-[600px] h-[600px] mb-8"
        />
      )}
    </div>
  );
}

export default Images;
