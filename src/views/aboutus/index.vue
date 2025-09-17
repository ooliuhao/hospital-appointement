<!--  -->
<template>
  <div class="all-class">
    <div class="left-class">
      <div class="gallery-container" :style="galleryContainerStyle">
        <div class="gallery" :style="{ transform: `translateY(-${scroll}px)` }">
          <div class="gallery-item" v-for="(image, index) in images" :key="index">
            <img style="width: 100%; object-fit: contain;" :src="image.src" alt="Image" ref="images" @load="handleImageLoad"/>
          </div>
        </div>
      </div>
      <div class="carousel-container">
        <el-carousel indicator-position="outside">
        <el-carousel-item v-for="(image, index) in images" :key="index">
          <div class="gallery-item" >
            <img style="width: 100%; object-fit: cover;" :src="image.src" alt="Image" ref="images" @load="handleImageLoad"/>
          </div>
    </el-carousel-item>
        </el-carousel>
      </div>
      
    </div>
    <div class="main-page" :style="mainPageStyle" ref="mainPage">
      <div class="header">
        <div class="header-inner">About Us</div>
      </div>
      <div class="description">
        <div class="description-inner">
          Addis Ababa Silk Road General Hospital is a private hospital which was opened in 2019. The Hospital operates
          20 departments and owns 100 beds, including 6 ICU beds. It has installed and set up the latest technologies
          and State-of-the-Art medical equipment, such as 1.5 Tesla MRI, 128 Slices CT, 4D Ultrasound, etc. Meanwhile we
          have gathered a strong international medical team with doctors from different countries, including China, US,
          Ethiopia, Belarus, Kyrgyzstan, etc. We aim to provide the highest quality medical service and patient care to
          improve the medical conditions for Ehtiopians and Africans. Silk Road Hospital is one of the most modern
          hospitals in Ethiopia which provides international standards of medical treatment. The Hospital believes that
          latest technologies and fast service make the health care as an essential routine examination.
        </div>
      </div>
      <div class="footer">
        <img src="@/assets/aboutus/aboutuscut.jpg" />
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'aboutus',
  data () {
    return {
      mainPageStyle: {
        // height:  document.body.clientHeight - 60 - 207 + 'px'
      },
      images: [
      {src: require('@/assets/image/gallary/1.jpg'), height: 0 },
      {src: require('@/assets/image/gallary/2.jpg'), height: 0 },
      {src: require('@/assets/image/gallary/3.jpg'), height: 0 },
      {src: require('@/assets/image/gallary/4.jpg'), height: 0 },
      {src: require('@/assets/image/gallary/5.jpg'), height: 0 },
        
      ],
      scroll: 0,
      galleryContainerStyle: {height: '500px'},
      galleryWidth: 0
    }
  },

  components: {},

  computed: {
    // galleryWidth() {
    //   return this.images.length * 100; // 假设每张图片的高度为100px
    // }
  },

  mounted () {
    // console.log("this.$refs.mainPage: ", this.$refs.mainPage.clientHeight + 'px')
    // for(let key in this.$refs) {
    //   console.log(this.$refs[key][0].clientHeight)
    // }

    // this.mainPageStyle.
    this.startScroll();
    const promises = [];
    
    for (let i = 0; i < this.images.length; i++) {
      promises.push(this.loadImage(this.images[i]));
    }
    
    Promise.all(promises)
      .then(() => {
        this.galleryContainerStyle.height = this.$refs.mainPage.clientHeight + 'px'
        // console.log("All images loaded");
        // 在这里可以访问所有图片的高度
        // console.log(this.images);
        // for(var i=0; i<this.images.length; i++) {
        //   this.galleryWidth += this.images[i].height
        // }
        for(var i=0; i<this.$refs.images.length; i++) {
          // console.log(this.$refs.images[i].clientHeight)
          this.galleryWidth += this.$refs.images[i].clientHeight
        }
        this.galleryWidth -= this.$refs.mainPage.clientHeight
        // console.log("this.galleryWidth:" + this.galleryWidth)
      })
      .catch((error) => {
        console.error("Image loading error:", error);
      });

  },

  methods: {
    startScroll() {
      setInterval(() => {
        this.scroll += 100; // 假设每次滚动100px，根据需要进行调整
        // console.log("this.scroll:" + this.scroll)
        // console.log("this.galleryWidth:" + this.galleryWidth)
        if (this.scroll >= this.galleryWidth) {
          this.scroll = 0; // 滚动到末尾后重新开始滚动
        }
      }, 2000); // 2秒滚动一次，根据需要进行调整
    },
    handleImageLoad(event) {
      const img = event.target
     
      // console.log("this.$refs.images")
      // console.log(this.$refs.images)
      const imageIndex = this.$refs.images.indexOf(img.parentElement);
      // console.log("imageIndex")
      // console.log(imageIndex)
      if (imageIndex !== -1) {
        // console.log('height')
        // console.log(img)
        // console.log(img.height)
        // console.log(img.attrs)
        this.images[imageIndex].height = img;
      }
      // console.log("this.images")
      // console.log(this.images)
    },
    loadImage(image) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        
        img.onload = () => {
          image.height = img.height;
          resolve();
        };
        
        img.onerror = () => {
          reject(new Error(`Failed to load image: ${image.src}`));
        };
        
        img.src = image.src;
      });
    }
  }
}

</script>
<style lang='scss' scoped>
.all-class {
 
  display: flex;
 flex-wrap: wrap;
  @media  (min-width: 942px) {
    display: grid;
   grid-template-columns: 250px auto;
  }

}
.main-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 200;
  padding: 0px 20px;
}
.header {
  width: 80%;
  
  margin: 20px auto;
  flex: 0 0 auto;
  .header-inner {
    font-size: 24px;
    font-weight: bold;
  }
}

.description {
  
 
  margin: 20px auto;
  display: flex;
  justify-content: center;
  flex: 1;
  .description-inner {
    
    text-align: justify; /* 设置文本对齐方式 */
  line-height: 1.5; /* 设置行高 */
  letter-spacing: 1px; /* 设置字符间距 */
  // text-decoration: underline; /* 设置文本下划线 */
  }
}
.footer {
  flex: 0 0 auto;
  width: 80%;

  img {
    width: 80%;
  }
}
.gallery-container {
  display: none;
  height: 400px; /* 设置容器的高度 */
  overflow: hidden; /* 隐藏溢出内容 */
  @media  (min-width: 600px) {
    display: block;
  }

}

.gallery {
  width: 100%;
  height: auto;
  transition: transform 0.5s; /* 设置过渡效果的持续时间 */
}

.gallery-item {
  // height: 100px; /* 设置每张图片的高度 */
}

.gallery-item img {
  max-height: 100%;
  max-width: 100%;
}
.carousel-container{
  height: 400px;
  width: 100vw;
  @media  (min-width: 600px) {
   display: none;
  }
}
::v-deep .el-carousel__container {
  width: 100%;
  height: 400px;
}

</style>
