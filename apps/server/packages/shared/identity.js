const ADJ=['Silent','Neon','Void','Calm','Blue','Grey','Quiet','Nova','Dark','Swift','Cosmic','Lunar','Solar','Prism','Echo','Jade','Obsidian','Ivory','Amber','Crimson','Hollow','Drift','Frost','Ember'];
const NOUN=['Fox','Wolf','Pine','Star','Edge','Drift','Wave','Moss','Hawk','River','Storm','Ridge','Flame','Frost','Spark','Raven','Cipher','Vector','Tide','Forge','Shard','Bloom','Creek','Veil'];
export function generateId(){
  return ADJ[Math.floor(Math.random()*ADJ.length)]+NOUN[Math.floor(Math.random()*NOUN.length)]+'_'+(Math.floor(Math.random()*9000)+1000);
}
