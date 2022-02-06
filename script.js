const appData = [
  {
    title: 'Title 1',
    text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
    img: 'https://picsum.photos/id/101/2621/1747',
    href: 'https://google.com/',
  },
  {
    title: 'Title 2',
    text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
    img: 'https://picsum.photos/id/114/3264/2448',
    href: 'https://google.com/',
  },
  {
    title: 'Title 3',
    text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
    img: 'https://picsum.photos/id/135/2560/1920',
    href: 'https://google.com/',
  },
];

<script>
		var states = document.getElementById('states');
		states.onchange = function(){
			console.log('state index: ' + states.selectedIndex);
			console.log('state name: ' + states.options[states.selectedIndex].text);
			console.log('img/' + states.value +  '@blocks.jpg');
			document.getElementById('postcard').style.backgroundImage = 'url(img/' + states.value + 'car1.jpg)';
			document.getElementById('greeting').innerHTML = 'Greetings from';
			document.getElementById('state-heading').innerHTML = states.options[states.selectedIndex].text;
		}
	</script>




  handleSelect = (e) => {
    const imgNode = document.getElementById('carouselImage');
    const imgWidth = `${imgNode.getBoundingClientRect().width}px`;
    imgNode.style.width = imgWidth;
    imgNode.dataset.width = imgWidth;
    const { index } = e.target.dataset;
    this.setState({ inTransition: true, });
    setTimeout(() => {
        this.setState({ index });
    }, 500);
  }

  componentDidMount() {
    const { data } = this.props;
    if(data) {
      this.setState({ data, startingUp: true, });
    }
    setTimeout(() => {
      this.setState({ startingUp: false });
    }, 1000);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.index !== this.state.index) {
      setTimeout(() => {
        this.setState({
          inTransition: false,
        });
        document.getElementById('carouselImage').style.width = null;
      }, 2000);
    }
  }

  render() {
    const { data, index, inTransition } = this.state;
    if(typeof data[index] != 'undefined') {
      var { title, text, img, href } = data[index];
    }
    const carouselCls = `carousel ${inTransition ? 'carousel--transition' : ''}`;
    const displayCls = `carousel__display ${inTransition ? 'carousel__display--transition' : ''}`;
    const imageStyle = {backgroundImage: `url("${img}")`}
    const controlItems = data.map((item, idx) => {
      const cls = `carousel__controls__item ${idx == index ? 'carousel__controls__item--active' : ''}`;
      return(<div className={cls} key={idx} data-index={idx} onClick={this.handleSelect}><div className='carousel__controls__item__inner'></div></div>
      )});
    return(
      <div className={carouselCls}>
        <div className='carousel__logo'>
          <img src={'http://jcagarcia.com/files/uploads/logo-placeholder.png'} />
        </div>
        <div className='carousel__controls'>
          {controlItems}
        </div>
        <div className={displayCls}>
          <div id='carouselImage' className='carousel__display__image' style={imageStyle}></div>
          <div className='carousel__display__content'>
            <div className='carousel__display__content__title'>
              {title}
            </div>
            <div className='carousel__display__content__text'>{text}</div>
            <a className='carousel__display__content__href' href={href} target='__blank'>MORE <svg viewBox="0 0 24 24" fill-rule="evenodd" clip-rule="evenodd"><path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z"/></svg></a>
          </div>
        </div>
      </div>
    );
  }
}

const Logo = (props) => {
  return(
    <div className='carousel__logo'>
      <img src={props.src} />
    </div>
  );
}

const Controls = (props) => {
  const controlItems = props.data.map((item, index) =>
    <div className='carousel__controls__item' key={index} data-index={index}></div>
  );
  return(
    <div className='carousel__controls'>{controlItems}</div>
  );
}

const Menu = () => {
  return(
    <div></div>
  );
}

const Icons = () => {
  return(
    <div></div>
  );
}

const Display = (props) => {
  //const { title, text, img, href } = props.currentData;
  const img = 'https://picsum.photos/id/1064/4236/2819';
  const displayStyle = {backgroundImage: `url("${img}")`}
  return(
    <div className='carousel__display'>
      <div className='carousel__display__image' style={displayStyle}></div>
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
