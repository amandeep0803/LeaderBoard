
import { _decorator, Component, Node, SpriteFrame, Sprite, Label, Prefab, instantiate, UITransform, ScrollView } from 'cc';
const { ccclass, property } = _decorator;
 
@ccclass('card')
export class card extends Component {
    @property({type:Node})
    position:Node
    @property({type:Node})
    playerName:Node;
    @property({type:Node})
    rating:Node;
    @property({type:Node})
    highlightColor:Node;
    @property({type:Prefab})
    star:Prefab;
    
    start (){
       
    }
    changeDetails(pos:number,name:string,rating:number){
        this.position.getComponent(Label).string=""+pos;
        this.playerName.getComponent(Label).string=name;
        this.setRating(rating);
    }
    setRating(rating:number){
        let initialXPos=-this.rating.getComponent(UITransform).width/2+5;
        for(let i=0;i<Math.floor(rating);i++){
            let ratingChild=instantiate(this.star);
            this.rating.addChild(ratingChild);
            ratingChild.setPosition(initialXPos,0,0);
            initialXPos+=(this.star.data.width+2);
        }
        let ratingChild=instantiate(this.star);
        ratingChild.getComponent(Sprite).fillRange=(rating-Math.floor(rating));
        this.rating.addChild(ratingChild);
        ratingChild.setPosition(initialXPos,0,0);
    }
    colorHighlight(){
        this.highlightColor.active=true;
    }
    // toggleActive(){
    //     this.node.active=!this.node.active;
    // }
}

