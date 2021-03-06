angular.module('ionicApp', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('eventmenu', {
      url: "/event",
      abstract: true,
      templateUrl: "event-menu.html"
    })
    .state('eventmenu.home', {
      url: "/home",
      views: {
        'menuContent' :{
          templateUrl: "home.html",
          controller: "HomeCtrl"
        }
      }
    })
    .state('eventmenu.nextpage', {
      url: "/nextpage",
      views: {
        'menuContent' :{
          templateUrl: "next-page.html"
        }
      }
    })
    .state('eventmenu.checkin', {
      url: "/check-in",
      views: {
        'menuContent' :{
          templateUrl: "check-in.html",
          controller: "CheckinCtrl"
        }
      }
    })
    .state('eventmenu.attendees', {
      url: "/attendees",
      views: {
        'menuContent' :{
          templateUrl: "attendees.html",
          controller: "AttendeesCtrl"
        }
      }
    })
  
  $urlRouterProvider.otherwise("/event/home");
})

.run(function($rootScope,$state){
  $rootScope.toggleMenu = function() {
    var $content = $('.menu-content');
    if( $content.hasClass('inactive') ) {
      $content.removeClass('inactive');
    } else {
      $content.addClass('inactive');
    }
  };
  
  $rootScope.go = function(path) {
    console.log('go',path);
    $state.go(path);
    $rootScope.toggleMenu();
  };
  
  $rootScope.menuButton = [
    {
      type: 'button-positive',
      content: '<i class="icon ion-navicon"></i>',
      tap: function(e) {
        $rootScope.toggleMenu();

       
      }
    }
  ];
})

.controller('MainCtrl', function($scope) {
  console.log('MainCtrl');
  




       

   $scope.paneClick = function(event) {

    var x = event.x;

    if (x > 275 && $('.menu-content').hasClass('inactive') ) {
       $scope.toggleMenu();
    }  

  };
  
  
  $scope.sideMenuClick = function() {
    console.log('sideMenuClick');
   

  };

  $('.click').on('click', function(){
    alert('click success');
    console.log('click');
  });

  $scope.attendees = [
    { firstname: 'Nicolas', lastname: 'Cage' },
    { firstname: 'Jean-Claude', lastname: 'Van Damme' },
    { firstname: 'Keanu', lastname: 'Reeves' },
    { firstname: 'Steven', lastname: 'Seagal' },
    { firstname: 'Jeff', lastname: 'Goldblum' },
    { firstname: 'Brendan', lastname: 'Fraser' }
  ];
})

.controller('HomeCtrl', function($scope,$rootScope,$window) {
  console.log('HomeCtrl');
})

.controller('CheckinCtrl', function($scope) {
  $scope.showForm = true;
  
  $scope.shirtSizes = [
    { text: 'Large', value: 'L' },
    { text: 'Medium', value: 'M' },
    { text: 'Small', value: 'S' }
  ];
  
  $scope.attendee = {};
  $scope.submit = function() {
    if(!$scope.attendee.firstname) {
      alert('Info required');
      return;
    }
    $scope.showForm = false;
    $scope.attendees.push($scope.attendee);
  };
  
})

.controller('AttendeesCtrl', function($scope) {
  
  $scope.activity = [];
  $scope.arrivedChange = function(attendee) {
    var msg = attendee.firstname + ' ' + attendee.lastname;
    msg += (!attendee.arrived ? ' has arrived, ' : ' just left, '); 
    msg += new Date().getMilliseconds();
    $scope.activity.push(msg);
    if($scope.activity.length > 3) {
      $scope.activity.splice(0, 1);
    }
  };
  
});