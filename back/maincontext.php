 <div id="sidebar">
			<div class="user-info">
				<div class="profile-img-wrapper">
						<img src="img/phiz-icon.png" >
				</div>
				<h4 class="gold-text">Rolligator Live</h4>
				<p class="gold-text">
					<i class="fa fa-bullhorn"></i>
					<a href="#" class="gold-text" id="username-broadcast">Raphael</a>
				</p>
			</div>
			<hr>
			<div class="contacts-wrapper">
				<input type="text" id="search-contact" class="form-control search-contact" placeholder="Search">
				<ul class="contact-list" id="contacts">
					<!----- contact 1 ----->
					<li class="contact-item">
						<div class="profile-holder">
								<img src="img/default-profile.jpg">
						</div>
						<div class="contact-name">
							<p class="gold-text">
								<i class="fa fa-bullhorn"></i>
								Raphael
								<a href="#"class="gift">
									<i class="fa fa-gift"></i>
								</a>
							</p>
						</div>
					</li><!----- end of contact 1 ----->
					<!----- contact 2 ----->
					<li class="contact-item">
						<div class="profile-holder">
								<img src="img/default-profile.jpg">
						</div>
						<div class="contact-name">
							<p class="free-text">
								John Doe
								<a href="#"class="gift">
									<i class="fa fa-gift"></i>
								</a>
							</p>
						</div>
					</li><!----- end of contact 2 ----->
					<!----- contact 3 ----->
					<li class="contact-item">
						<div class="profile-holder">
								<img src="img/default-profile.jpg">
						</div>
						<div class="contact-name">
							<p class="silver-text">
								Ryan Miller
								<a href="#"class="gift">
									<i class="fa fa-gift"></i>
								</a>
							</p>
						</div>
					</li><!----- end of contact 3 ----->
					<!----- contact 4 ----->
					<li class="contact-item">
						<div class="profile-holder">
								<img src="img/default-profile.jpg">
						</div>
						<div class="contact-name">
							<p class="bronze-text">
								Jenny Huang
								<a href="#"class="gift">
									<i class="fa fa-gift"></i>
								</a>
							</p>
						</div>
					</li><!----- end of contact 4 ----->
					<!----- contact 5 ----->
					<li class="contact-item">
						<div class="profile-holder">
								<img src="img/default-profile.jpg">
						</div>
						<div class="contact-name">
							<p class="gold-text">
								William Grey
								<a href="#"class="gift">
									<i class="fa fa-gift"></i>
								</a>
							</p>
						</div>
					</li><!----- end of contact 5 ----->
					<!----- contact 6 ----->
					<li class="contact-item">
						<div class="profile-holder">
								<img src="img/default-profile.jpg">
						</div>
						<div class="contact-name">
							<p class="free-text">
								Chris John Plarisan
								<a href="#"class="gift">
									<i class="fa fa-gift"></i>
								</a>
							</p>
						</div>
					</li><!----- end of contact 6 ----->
				</ul>
			</div>
    </div><!--- end of sidebar section --->

		<div class="">

		</div>

		<div class="main-content">
			<!--- navbar section --->
			<nav class="navbar navbar-expand-md navbar-dark">
				<div class="container">
					<a class="navbar-brand" href="#">Rolligator Live Broadcast</a>
						<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
							<span class="navbar-toggler-icon"></span>
						</button>
					<div class="collapse navbar-collapse" id="collapsibleNavbar">
						<ul class="navbar-nav nav-right">
							<li class="nav-item">
								<span id="link-holder">https://phiz.live/dynamic-link-goes-here123</span>
								<button class="btn btn-copy" onclick="copyToClipboard('#link-holder')" id="copy-btn">Copy</button>
							</li>
						</ul>
					</div>
				</div>
			</nav>

			<div class="main-view">
				<div class="container">
					<div class="ctrls-wrapper">
						<span class="ctrls"><i class="fa fa-volume-up"></i></span>
						<span class="ctrls"><i class="fa fa-microphone"></i></span>
						<span class="ctrls"><i class="fa fa-expand"></i></span>
						<span data-toggle="modal" data-target="#mediaDevice" class="ctrls"><i class="fa fa-ellipsis-v"></i></span>
					</div>
				</div>
				<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel" data-interval="false">
			    <div class="carousel-inner" role="listbox">
			      <div class="carousel-item active">
								<div class="user-vid-holder">
<!------------------- users video calling put here -------------------->
									<!-- I put controls so video tag show up -->
									<!-- I set the vid-feed width and height (4:3 ratio) and video inside to fill the wrapper -->
									<!-- I make jquery if statement to count how many video
								 	below so I can apply proper width and height to avoid
									getting out the wrapper -->

									<!-- this represent one user connected -->
									<!-- contains 24 user -->
									<div class="vid-feed">
											<video class="vid-user-feed" autoplay controls></video>
									</div>
									<div class="vid-feed">
											<video class="vid-user-feed" autoplay controls></video>
									</div>
									<div class="vid-feed">
											<video class="vid-user-feed" autoplay controls></video>
									</div>
									<div class="vid-feed">
											<video class="vid-user-feed" autoplay controls></video>
									</div>
									<div class="vid-feed">
											<video class="vid-user-feed" autoplay controls></video>
									</div>
									<div class="vid-feed">
											<video class="vid-user-feed" autoplay controls></video>
									</div>
									<div class="vid-feed">
											<video class="vid-user-feed" autoplay controls></video>
									</div>
									<div class="vid-feed">
											<video class="vid-user-feed" autoplay controls></video>
									</div>
									<div class="vid-feed">
											<video class="vid-user-feed" autoplay controls></video>
									</div>
									<div class="vid-feed">
											<video class="vid-user-feed" autoplay controls></video>
									</div>
									<div class="vid-feed">
											<video class="vid-user-feed" autoplay controls></video>
									</div>
									<div class="vid-feed">
											<video class="vid-user-feed" autoplay controls></video>
									</div>
									<div class="vid-feed">
											<video class="vid-user-feed" autoplay controls></video>
									</div>
									<div class="vid-feed">
											<video class="vid-user-feed" autoplay controls></video>
									</div>
									<div class="vid-feed">
											<video class="vid-user-feed" autoplay controls></video>
									</div>
									<div class="vid-feed">
											<video class="vid-user-feed" autoplay controls></video>
									</div>
									<div class="vid-feed">
											<video class="vid-user-feed" autoplay controls></video>
									</div>
									<div class="vid-feed">
											<video class="vid-user-feed" autoplay controls></video>
									</div>
									<div class="vid-feed">
											<video class="vid-user-feed" autoplay controls></video>
									</div>
									<div class="vid-feed">
											<video class="vid-user-feed" autoplay controls></video>
									</div>
									<div class="vid-feed">
											<video class="vid-user-feed" autoplay controls></video>
									</div>
									<div class="vid-feed">
											<video class="vid-user-feed" autoplay controls></video>
									</div>
									<div class="vid-feed">
											<video class="vid-user-feed" autoplay controls></video>
									</div>
									<div class="vid-feed">
											<video class="vid-user-feed" autoplay controls></video>
									</div>

								</div>

<!------------------- users video calling put above -------------------->
			      </div>
			      <div class="carousel-item">
							<h3>Panel 2</h3>
			      </div>
			      <div class="carousel-item">
							<h3>Panel 3</h3>
			      </div>
			    </div>
			    <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
			          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
			          <span class="sr-only">Previous</span>
			        </a>
			    <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
			          <span class="carousel-control-next-icon" aria-hidden="true"></span>
			          <span class="sr-only">Next</span>
			        </a>
			  </div>

				<!-- flex wrapper to hold chat and video thumb -->
				<div class="flex-holder">
					<div id="chatbox">
						<div class="chatbox-body">
	<!---------------- chat content goes here ---------------------->
							<div class="chat-content">
								<div class="media-body-gray">
									<img class="profile-pic-chat" src="img/default-profile.jpg">
									<span>John Doe</span>
										<p>Hello</p>
										<p>how are you buddy?</p>
										<span class="meta">
											<time datetime="2018">00:10</time>
										</span>
								</div>
							</div>
							<div class="chat-content">
									<div class="media-body-orange">
											<p>Hello, I'm good, how bout you?</p>
											<span class="meta">
												<i class="fa fa-check"></i><i class="fa fa-check"></i>
												<time datetime="2018">00:06</time>
											</span>
									</div>
							</div>
							<div class="chat-content">
								<div class="media-body-gray">
									<img class="profile-pic-chat" src="img/default-profile.jpg">
									<span>John Doe</span>
										<p>I'm fine</p>
										<p>I'm just testing this Phiz chatbox, if it works fine.</p>
										<span class="meta">
											<time datetime="2018">00:10</time>
										</span>
								</div>
							</div>
							<div class="chat-content">
									<div class="media-body-orange">
											<p>So, what you think buddy?</p>
											<p>I think it looks pretty well on my side.</p>
											<span class="meta">
												<i class="fa fa-check"></i><i class="fa fa-check"></i>
												<time datetime="2018">00:06</time>
											</span>
									</div>
							</div>
							<div class="chat-content">
								<div class="media-body-gray">
									<img class="profile-pic-chat" src="img/default-profile.jpg">
									<span>John Doe</span>
										<p>That's good to hear 	&#128515;</p>
										<p>can you send me a long chat, let see how it looks in the bubble</p>
										<span class="meta">
											<time datetime="2018">00:10</time>
										</span>
								</div>
							</div>
							<div class="chat-content">
									<div class="media-body-orange">
											<p>Anything bro?</p>
											<span class="meta">
												<i class="fa fa-check"></i><i class="fa fa-check"></i>
												<time datetime="2018">00:06</time>
											</span>
									</div>
							</div>
							<div class="chat-content">
								<div class="media-body-gray">
									<img class="profile-pic-chat" src="img/default-profile.jpg">
									<span>John Doe</span>
										<p>Anything you think of.</p>
										<span class="meta">
											<time datetime="2018">00:10</time>
										</span>
								</div>
							</div>
							<div class="chat-content">
									<div class="media-body-orange">
											<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
												sed do eiusmod tempor incididunt ut labore et dolore magna
												aliqua. Ut enim ad minim veniam, quis nostrud exercitation
												ullamco laboris nisi ut aliquip ex ea commodo consequat.
												Duis aute irure dolor in reprehenderit in voluptate velit
												esse cillum dolore eu fugiat nulla pariatur. Excepteur
												sint occaecat cupidatat non proident, sunt in culpa qui
												officia deserunt mollit anim id est laborum.
											</p>
											<span class="meta">
												<i class="fa fa-check"></i><i class="fa fa-check"></i>
												<time datetime="2018">00:06</time>
											</span>
									</div>
							</div>
							<div class="chat-content">
								<div class="media-body-gray">
									<img class="profile-pic-chat" src="img/default-profile.jpg">
									<span>John Doe</span>
										<p>Dummy text! hahaha pretty clever</p>
										<p>&#129315;&#129315;&#129315;</p>
										<p>thanks bro!</p>
										<span class="meta">
											<time datetime="2018">00:10</time>
										</span>
								</div>
							</div>
							<div class="chat-content">
									<div class="media-body-orange">
											<p>hahaha welcome bro &#128526;&#128526;&#128526;</p>
											<span class="meta">
												<i class="fa fa-check"></i><i class="fa fa-check"></i>
												<time datetime="2018">00:06</time>
											</span>
									</div>
							</div>
	<!------------------- end of chat content ------------------------>
						</div>
						<div class="chabox-input">
							<a href="#" class="attachment">
								<i class="fa fa-plus"></i>
							</a>
							<input type="text" class="form-control chat-input" placeholder="Type message">
						</div>
					</div>

<!------------------- your webcam view here -------------------->
					<div id="vid-large-holder">
						<video class="webcam-view-large" autoplay id="videoElement" controls></video>
					</div>
<!------------------- your webcam view above -------------------->
				</div>
			</div>

		</div>