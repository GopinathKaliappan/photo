import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { fabric } from 'fabric';  
import { ImagePicker } from '@ionic-native/image-picker';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Camera, CameraOptions } from '@ionic-native/camera';

  var filters = ['grayscale', 'invert', 'remove-color', 'sepia', 'brownie',
                      'brightness', 'contrast', 'saturation', 'noise', 'vintage',
                      'pixelate', 'blur', 'sharpen', 'emboss', 'technicolor',
                      'polaroid', 'blend-color', 'gamma', 'kodachrome',
                      'blackwhite', 'blend-image', 'hue'];


const images = {
  items: ['beard', 'cap', 'glasses', 'hairstyle', 'pinky'],
  data: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14],
  list: [0,1,2,3,4]
}


export const kabadi = {
  logos: {
    //items: ['jaipur', 'haryana', 'tamil'],
    items: ['angular', 'ionic', 'react', 'ember', 'ionic2', 'angular2'],
    angular: {
      name: 'AngularJS',
      url: 'assets/imgs/c.png'
    },        
    ionic: {
      name: 'Ionic',
      url: 'https://s-media-cache-ak0.pinimg.com/originals/dd/ec/17/ddec173bbaa672d3a45f6a41b9891eb3.png'
    },    
    react: {
      name: 'ReactJS',
      url: 'https://www.shareicon.net/download/2016/08/01/640324_logo_512x512.png'
    },
    ember: {
      name: 'EmberJS',
      url: 'https://upload.wikimedia.org/wikipedia/en/6/69/Ember.js_Logo_and_Mascot.png'
    },
    ionic2: {
      name: 'ionic 1',
      url: 'https://s-media-cache-ak0.pinimg.com/originals/dd/ec/17/ddec173bbaa672d3a45f6a41b9891eb3.png'
    },
    angular2: {
      name: 'AngularTS',
      url: 'https://angular.io/assets/images/logos/angularjs/AngularJS-Shield.svg'
    },
  }
}




@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})



export class AboutPage {
  // private canvas: object = {};
  canvas: any;
  logos: any;
  sharing: any;
  evCache: any;
  prevDiff: any;
  el: any;
  filters: any;
  images: any;
  type: any;
  url: any;
  selectedCategory: any;
  parentUrl: any;
  slash: any;
  fabric: any;
  constructor(public navCtrl: NavController, private imagePicker: ImagePicker,private socialSharing: SocialSharing, private camera: Camera) {
  	this.initCanvas = this.initCanvas.bind(this);	
  	this.createCircle = this.createCircle.bind(this);	
    this.pickImage = this.pickImage.bind(this);
    this.addLogo = this.addLogo.bind(this);
    this.resizeCanvas = this.resizeCanvas.bind(this);
    this.shareImage = this.shareImage.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.captureImage = this.captureImage.bind(this);
    this.addEfect = this.addEfect.bind(this);
    this.addText =this.addText.bind(this);
    this.imagePicker = imagePicker;  
    this.camera= camera;
    this.sharing = socialSharing;
    this.canvas = {};
    this.logos = kabadi.logos;
    this.evCache = new Array();
    this.prevDiff = -1;
    this.filters = filters;
    this.images = images;
    this.url = 'assets/external/';
    this.parentUrl = 'assets/external/categories/';
    this.selectedCategory = ''; 
    this.type = '.png';
    this.slash = '/';
    this.changeCategory = this.changeCategory.bind(this);
    this.addBackground = this.addBackground.bind(this);
    this.setBackgroundImage = this.setBackgroundImage.bind(this);
    this.setCanvasAspect = this.setCanvasAspect.bind(this);
  }
  ngAfterContentInit() {
      this.initCanvas();   
      console.log(window.innerWidth);
      window.addEventListener('resize', this.resizeCanvas, false);
  }
  initCanvas() {
  	 this.canvas = new fabric.Canvas('oviya', {
      width: window.innerWidth - 10,
      height: window.innerHeight -80, 
      hoverCursor: 'pointer',
      selection: true,
      selectionBorderColor: 'blue',
      allowTouchScrolling: true
    },()=>{ 
    this.canvas.renderAll.bind(this.canvas);
    this.resizeCanvas();
    });	
  }
   resizeCanvas(){
    this.canvas.setWidth(window.innerWidth);
    this.canvas.setHeight(window.innerHeight - 20); 
    this.canvas.renderAll.bind(this.canvas);
    console.log(window.innerHeight,window.innerWidth )      
   } 
  createCircle() {
   new fabric.Image.fromURL('assets/imgs/logos/kabadi/haryana.png', (img) => {
    img.scale(0.5).set({
      top : 100,
      left : 100,
      width : 60,
      height : 70,
      angle: -15
    });
    this.canvas.add(img).setActiveObject(img);
  });
  }
  addLogo(logo){
    const option = {
      width : 100,
      height : 100
    } 
   let dataUrl = this.url + this.selectedCategory + this.slash + logo + this.type;
   //this.setBackgroundImage(dataUrl);
   fabric.Image.fromURL(dataUrl, (img) => {
    img.scaleToWidth(100);
    img.scaleToHeight(100);
    this.canvas.add(img).setActiveObject(img);
    this.canvas.renderAll.bind(this.canvas)
   });
  }
  addImage(logo){
   new fabric.Image.fromURL(logo, (img) => {
      img.scale(1).set({
      top : 100,
      left : 100,
      width : 200,
      height : 200,
      angle: -15
    });
    this.canvas.add(img).setActiveObject(img);
   });
  }
  pickImage(type) {
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        mediaType: this.camera.MediaType.PICTURE
      }
      this.imagePicker.getPictures(options).then((results) => {
         for (var i = 0; i < results.length; i++) {
             console.log('Image URI: ' + results[i]);
             try {
             if(type === 'backgroundImage') {
               this.setBackgroundImage(results[i]);
             } else {
              this.addImage(results[i])
             }
             
           } catch(e) {
            console.log("Error", e);
          }
         }
      }, (err) => {  });
             
      }
      addBackground(bgImage) {
            var canvasAspect = this.canvas.width / this.canvas.height ;
            var imgAspect = bgImage.width / bgImage.height;
            var left = 0;
            var top = 0;
            var scaleFactor = 0;

            if (canvasAspect >= imgAspect) {
                var scaleFactor = this.canvas.width / bgImage.width;
                left = 0;
                top = -((bgImage.height * scaleFactor) - this.canvas.height) / 2;
            } else {
                var scaleFactor = this.canvas.height / bgImage.height;
                top = 0;
                left = -((bgImage.width * scaleFactor) - this.canvas.width) / 2;

            }

            this.canvas.setBackgroundImage(bgImage, this.canvas.renderAll.bind(this.canvas), {
                top: top,
                left: left,
                originX: 'left',
                originY: 'top',
                scaleX: 300,
                scaleY: scaleFactor,
                width: this.canvas.width,
                height: this.canvas.height,
                backgroundImageStretch: true
            });
            this.canvas.renderAll();
      }
      setBackgroundImage(logo) {
          new fabric.Image.fromURL(logo, (img) => {
            this.canvas.add(img).setActiveObject(img);
            let activeObj = this.canvas.getActiveObject();
            
            let iw = 0; 
            let ih = 0 ;
            this.setCanvasAspect(activeObj.width,activeObj.height, logo);
            setTimeout(() => {
              this.canvas.remove(this.canvas.getActiveObject());
            }, 1000);
          })
 
      }
      setCanvasAspect(iw,ih, img){
          this.canvas.setWidth(window.innerWidth- 30);
          this.canvas.setHeight(window.innerHeight -30);
          // let cw = this.canvas.width;
          // let ch = this.canvas.height;
          // let width_ratio  = cw  / iw;
          // let height_ratio = ch / ih;
          // let fh = 0;
          // let fw = 0
          // if (width_ratio > height_ratio) {
          //   fw = iw * width_ratio;
          //   fh = ih*fw/iw;
          // } else {
          //   fh = ih * height_ratio;
          //   fw = iw*fh/ih;    
          // }
          var width = iw;
          var height = ih;
          var maxWidth = this.canvas.width;
          var maxHeight = this.canvas.height;
          var ratio = maxWidth / width;
          if (height * ratio > maxHeight) {
              ratio = maxHeight / height;

          }
          // console.log("Image Aspect", fw / 1.5 , fh / 1.5);
          // console.log("Canvas Aspect", cw , ch);
          this.canvas.setBackgroundImage(img, this.canvas.renderAll.bind(this.canvas), {
               //width: fw - 100 ,  
               width: width * ratio,
               // height: fh - 100,
               height:height * ratio  ,
               backgroundImageOpacity: 0.5,
               backgroundImageStretch: true,
               originX: 'left',
               originY: 'top'
            });

          this.canvas.setWidth(width * ratio);
          this.canvas.setHeight(height * ratio);
          this.canvas.renderAll.bind(this.canvas);
      }
      captureImage(type){
          const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
          }

          this.camera.getPicture(options).then((imageData) => {
   // imageData is either a base64 encoded string or a file URI
   // If it's base64:
          let base64Image = 'data:image/jpeg;base64,' + imageData;
          if(type === 'backgroundImage') {
              this.setBackgroundImage(base64Image);
          } else {
            this.addImage(base64Image);
          }
          }, (err) => {

   // Handle error
          });
      }
      shareImage() {
        this.sharing.share('myFAB','ASD',this.canvas.toDataURL('png'),'www.facebookjs.com').then(() => {
      }).catch((err) => {
        // Sharing via email is not possible
        alert(err)

      });
      }
      deleteItem() {
        if(this.canvas.getActiveObject()) {
         this.canvas.remove(this.canvas.getActiveObject());  
        }
      }
      addText() {
        var comicSansText = new fabric.IText("I'm in Comic Sans", {
           fontFamily: 'Comic Sans'
        });
        this.canvas.add(comicSansText).setActiveObject(comicSansText);
      }
     addEfect(index, prop, value) {
      var filter = new fabric.Image.filters.Tint({
        color: '#3513B0',
        opacity: 0.5
      });
        this.canvas.getActiveObject().crossOrigin = 'Anonymous';
        this.canvas.getActiveObject().filters.push(filter);
        this.canvas.getActiveObject().applyFilters(this.canvas.renderAll.bind(this.canvas));
     }
     changeCategory(category){
        if(this.selectedCategory === category){
          this.selectedCategory = ''; 
        } else {
          this.selectedCategory = category; 
        }   
     }
}
