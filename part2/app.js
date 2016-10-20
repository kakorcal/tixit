(function(){
  var Block = Gem.Block;
  var Style = Gem.Style;
  var Text = Gem.Text;
  var List = Gem.List; 
  var TextField = Gem.TextField;

  Gem.defaultStyle = Style({
    display: 'block', 
    width: '100%',
    fontFamily: "'Helvetica Neue',Helvetica,Arial,sans-serif",
    fontSize: 14,
    lineHeight: 1.42857143,
    color: '#333'
  });

  var container = Block();
  
  var chatbox = proto(Gem, function(){
    this.name = 'chatbox';
    this.build = function(user){
      var identifier = '#' + user;
      this.heading = Text(user);
      this.messages = List(identifier);
      this.textInput = TextField();
      
      this.textInput.on('keyup', function(e){
        if(e.keyCode === 13){
          container.emit('submitMessage', e.target.value, identifier);
          this.val = '';
        }
      });

      this.add(this.heading, this.messages, this.textInput);
    };
  });

  container.add(chatbox('User1'), chatbox('User2'));
  container.attach();
  
  container.on('submitMessage', function(message, label){
    addMessage(container);
    
    function addMessage(currentGem){
      if(currentGem.label){
        var newItem = Text();
        if(currentGem.label === label){
          newItem.text = 'Me: ' + message;
          newItem.style = Style({color: 'gray'});
        }else{
          newItem.text = 'You: ' + message;
          newItem.style = Style({color: 'blue'});
        }
        currentGem.item(newItem);
      }else{
        if(currentGem.children.length){
          for(var i = 0; i < currentGem.children.length; i++){
            addMessage(currentGem.children[i]);
          }          
        }
      }
    }
  });

  container.style = Style({
    padding: '0 15px',
    margin: '0 auto',
    display: 'table',
    content: '',
    zoom: 1,
    width: '100%',
    chatbox: {
      width: '50%',
      float: 'left',
      minHeight: 1,
      paddingRight: 15,
      paddingLeft: 15,
      Text: {
        fontSize: 24,
        margin: '12px 0 10px 0',
        fontWeight: 500,
        lineHeight: 1.1
      },
      List: {
        margin: '0 0 10px 0'
      },
      TextField: {
        height: 34,
        padding: '6px 12px',
        fontSize: 14,
        lineHeight: 1.42857143,
        color: '#555',
        border: '1px solid #ccc',
        borderRadius: 4,
        boxShadow: 'inset 0 1px 1px rgba(0,0,0,.075)',
        backgroundColor: '#fff',
        backgroundImage: 'none',
        $$focus: {
          borderColor: '#66afe9',
          outline: 0,
          boxShadow: 'inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6)'
        }
      }
    }
  });
})();