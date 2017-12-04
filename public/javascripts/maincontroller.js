

app.controller("hrCtr", function ($scope, $http, $location, $window, $timeout,$filter) {
   $scope.openNav= function() {
        document.getElementById("myNav").style.width = "100%";
    };
   $scope.closeNav= function () {
        document.getElementById("myNav").style.width = "0%";
    };
    $scope.confirmPassword=function(user){
        if(user.password!=$scope.confPassword){
            $scope.passwordCheck=true;
        } else {
            $scope.passwordCheck=false;
        }
    };
    (function () {
        var root = angular.element(document.getElementsByTagName('body'));

        var watchers = [];

        var f = function (element) {
            angular.forEach(['$scope', '$isolateScope'], function (scopeProperty) {
                if (element.data() && element.data().hasOwnProperty(scopeProperty)) {
                    angular.forEach(element.data()[scopeProperty].$$watchers, function (watcher) {
                        watchers.push(watcher);
                    });
                }
            });

            angular.forEach(element.children(), function (childElement) {
                f(angular.element(childElement));
            });
        };

        f(root);

        // Remove duplicate watchers
        var watchersWithoutDuplicates = [];
        angular.forEach(watchers, function(item) {
            if(watchersWithoutDuplicates.indexOf(item) < 0) {
                watchersWithoutDuplicates.push(item);
            }
        });

        console.log('Site Visited='+watchersWithoutDuplicates.length);
    })();

    $scope.initial= function (){
        $http.get('/dashbordStatistic/').success(function (data, status, headers, config){
            $scope.Report = data;
            Highcharts.chart('container', {
                //chart: {
                //    type: 'area'
                //},
                title: {
                    text: 'REGISTERED AGENTS IN YEAR '+data.date.year
                },
                xAxis: {
                    categories: data.months,
                    lineWidth: 1,
                    lineColor: "#fffff",
                },
                series: [{
                    type: 'area',
                    name: 'Registered Agents',
                    data: data.registeredAgents[0]

                }, {
                    type: 'spline',
                    name: 'Agents line',
                    data: data.registeredAgents[0],
                    marker: {
                        lineWidth: 2,
                        lineColor: Highcharts.getOptions().colors[3],
                        fillColor: 'white'
                    }
                }

                ]
            });
            Highcharts.chart('container2', {
                //chart: {
                //    type: 'area'
                //},
                title: {
                    text: 'AGENTS FLOAT RECHARGE IN YEAR '+data.date.year
                },
                xAxis: {
                    categories: data.months,
                    lineWidth: 1,
                    lineColor: "#fffff",
                },
                series: [{
                               type: 'area',
                               name: 'Agents Float',
                                data: data.agentCharge[0]

                          },{
                               type: 'spline',
                               name: 'Agents Float line',
                             data: data.agentCharge[0],
                          marker: {
                            lineWidth: 2,
                           lineColor: Highcharts.getOptions().colors[3],
                            fillColor: 'white'
                            }
                            }
                            ]
            });
            Highcharts.chart('container3', {
                //chart: {
                //    type: 'area'
                //},
                title: {
                    text: 'EUCL TRANSACTION IN YEAR '+data.date.year
                },
                xAxis: {
                    categories: data.months,
                    lineWidth: 1,
                    lineColor: "#fffff",
                },
                series: [{

                    type: 'area',
                    name: 'Eucl',
                    data: data.eucl[0]
                     },{
                    type: 'spline',
                    name: 'Eucl line',
                    data: data.eucl[0],
                    marker: {
                        lineWidth: 2,
                        lineColor: Highcharts.getOptions().colors[3],
                        fillColor: 'white'
                    }
                   }]
            });



            Highcharts.chart('container4', {


                                                        title: {
                                                            text: 'TIGO AIRTIME TRANSACTION IN YEAR '+data.date.year
                                                        },
                                                        xAxis: {
                                                            categories: data.months
                                                        },
                                                        yAxis: {
                                                            min: 0,
                                                            title: {
                                                                text: 'Frw'
                                                            }
                                                        },
                                                        legend: {
                                                            reversed: false
                                                        },
                                                        plotOptions: {
                                                            series: {
                                                                stacking: 'normal'
                                                            }
                                                        },
                                                        series: [{

                                                            type: 'area',
                                                            name: 'Tigo Air Time',
                                                            data: data.tigoAirtime[0]

                                                        },{
                                                         type: 'spline',
                                                          name: 'Tigo Air Time line',
                                                          data: data.tigoAirtime[0],
                                                          marker: {
                                                          lineWidth: 2,
                                                          lineColor: Highcharts.getOptions().colors[3],
                                                          fillColor: 'white'
                                                          }
                                                          }]
                                                    });

            Highcharts.chart('container5', {


                                                                    title: {
                                                                        text: 'TIGO CASHIN/OUT TRANSACTION IN YEAR '+data.date.year
                                                                    },
                                                                    xAxis: {
                                                                        categories: data.months
                                                                    },
                                                                    yAxis: {
                                                                        min: 0,
                                                                        title: {
                                                                            text: 'Frw'
                                                                        }
                                                                    },
                                                                    legend: {
                                                                        reversed: false
                                                                    },
                                                                    plotOptions: {
                                                                        series: {
                                                                            stacking: 'normal'
                                                                        }
                                                                    },
                                                                    series: [{

                                                                        type: 'area',
                                                                        name: 'Tigo Cash',
                                                                        data: data.tigoCashInOut[0]

                                                                    },{
                                                                     type: 'spline',
                                                                     name: 'Tigo Cash line',
                                                                     data: data.tigoCashInOut[0],
                                                                     marker: {
                                                                     lineWidth: 2,
                                                                     lineColor: Highcharts.getOptions().colors[3],
                                                                     fillColor: 'white'
                                                                     }
                                                                     }]
                                                                });

            Highcharts.chart('container6', {


                             title: {
                             text: 'MTN AIRTIME IN YEAR '+data.date.year
                             },
                             xAxis: {
                             categories: data.months
                             },
                             yAxis: {
                             min: 0,
                              title: {
                              text: 'Number'
                               }
                               },
                               legend: {
                                reversed: false
                                },
                                 plotOptions: {
                                 series: {
                                 stacking: 'normal'
                                 }
                                  },
                                  series: [{

                                  type: 'area',
                                  name: 'Mtn Airtime',
                                  data: data.mtnAirtime[0]

                                  },{
                                  type: 'spline',
                                  name: 'Mtn Airtime line',
                                  data: data.mtnAirtime[0],
                                  marker: {
                                  lineWidth: 2,
                                  lineColor: Highcharts.getOptions().colors[3],
                                  fillColor: 'white'
                                  }
                                  }]
                                   });
            Highcharts.chart('container7', {

                             title: {
                             text: 'MTN CASHIN/OUT IN YEAR '+data.date.year
                             },
                             xAxis: {
                             categories: data.months
                             },
                             yAxis: {
                             min: 0,
                              title: {
                              text: 'Number'
                               }
                               },
                               legend: {
                                reversed: false
                                },
                                 plotOptions: {
                                 series: {
                                 stacking: 'normal'
                                 }
                                  },
                                  series: [{

                                  type: 'area',
                                  name: 'Mtn Cashin/out',
                                  data: data.mtnCashInOut[0]

                                  },{
                                  type: 'spline',
                                  name: 'Mtn Cashin/out line',
                                  data: data.mtnCashInOut[0],
                                  marker: {
                                  lineWidth: 2,
                                  lineColor: Highcharts.getOptions().colors[3],
                                  fillColor: 'white'
                                  }
                                  }]
                                   });

            Highcharts.chart('container8', {

                             title: {
                             text: 'STARTTIMES PAYMENT SELL IN YEAR '+data.date.year
                             },
                             xAxis: {
                             categories: data.months
                             },
                             yAxis: {
                             min: 0,
                              title: {
                              text: 'Number'
                               }
                               },
                               legend: {
                                reversed: false
                                },
                                 plotOptions: {
                                 series: {
                                 stacking: 'normal'
                                 }
                                  },
                                  series: [{

                                  type: 'area',
                                  name: 'Start times',
                                  data: data.startTimes[0]

                                  },{
                                   type: 'spline',
                                   name: 'Start times line',
                                   data: data.startTimes[0],
                                   marker: {
                                   lineWidth: 2,
                                   lineColor: Highcharts.getOptions().colors[3],
                                    fillColor: 'white'
                                    }
                                    }]
                                   });
            Highcharts.chart('container9', {


                             title: {
                             text: 'MTN BILL PAYMENT IN YEAR '+data.date.year
                             },
                             xAxis: {
                             categories: data.months
                             },
                             yAxis: {
                             min: 0,
                              title: {
                              text: 'Number'
                               }
                               },
                               legend: {
                                reversed: false
                                },
                                 plotOptions: {
                                 series: {
                                 stacking: 'normal'
                                 }
                                  },
                                  series: [{

                                  type: 'area',
                                  name: 'Mtn bill payment',
                                  data: data.mtnBill[0]

                                  },{
                                  type: 'spline',
                                  name: 'Mtn bill payment line',
                                  data: data.mtnBill[0],
                                  marker: {
                                  lineWidth: 2,
                                  lineColor: Highcharts.getOptions().colors[3],
                                  fillColor: 'white'
                                  }
                                  }]
                                   });

            Highcharts.chart('container10', {


                             title: {
                             text: 'TIGO MERCHANT PAYMENT IN YEAR '+data.date.year
                             },
                             xAxis: {
                             categories: data.months
                             },
                             yAxis: {
                             min: 0,
                              title: {
                              text: 'Number'
                               }
                               },
                               legend: {
                                reversed: false
                                },
                                 plotOptions: {
                                 series: {
                                 stacking: 'normal'
                                 }
                                  },
                                  series: [{

                                  type: 'area',
                                  name: 'Tigo merchant payment',
                                  data: data.tigoBill[0]

                                  },{
                                   type: 'spline',
                                   name: 'Tigo merchant payment line',
                                   data: data.tigoBill[0],
                                   marker: {
                                   lineWidth: 2,
                                   lineColor: Highcharts.getOptions().colors[3],
                                   fillColor: 'white'
                                   }
                                   }]
                                   });
            Highcharts.chart('container11', {
                             title: {
                             text: 'DSTV PAYMENT IN YEAR '+data.date.year
                             },
                             xAxis: {
                             categories: data.months
                             },
                             yAxis: {
                             min: 0,
                              title: {
                              text: 'Number'
                               }
                               },
                               legend: {
                                reversed: false
                                },
                                 plotOptions: {
                                 series: {
                                 stacking: 'normal'
                                 }
                                  },
                                  series: [{

                                  type: 'area',
                                  name: 'Dstv payment',
                                  data: data.dstv[0]

                                  },{
                                  type: 'spline',
                                  name: 'Dstv payment line',
                                  data: data.dstv[0],
                                  marker: {
                                  lineWidth: 2,
                                  lineColor: Highcharts.getOptions().colors[3],
                                  fillColor: 'white'
                                  }
                                  }]
                                   });
            // Sample data for pie chart
//                            $scope.pieData = [{
//                                                    name: "Microsoft Internet Explorer",
//                                                    y: 56.33
//                                                }, {
//                                                    name: "Chrome",
//                                                    y: 24.03,
//                                                    sliced: true,
//                                                    selected: true
//                                                }, {
//                                                    name: "Firefox",
//                                                    y: 10.38
//                                                }, {
//                                                    name: "Safari",
//                                                    y: 4.77
//                                                }, {
//                                                    name: "Opera",
//                                                    y: 0.91
//                                                }, {
//                                                    name: "Proprietary or Undetectable",
//                                                    y: 0.2
//                                            }]
        });
};
    $scope.signin=function(){
        if($scope.username==''||$scope.password==''){
            $scope.messages = {class:"alert alert-danger",msg:"Error: Wrong Username or password !."};
            $scope.password="";
            return;
        }
        $scope.messages = {class:"alert alert-warning",msg:"Please wait.."};
        $http.post('/signin/', {email:$scope.userName,phone:$scope.userName,password:$scope.password}).success(function (data, status, headers, config) {
            if (data=='ok') {

                $window.location="/dashboard"
            }
           else {
                $scope.messages = {class:"alert alert-danger",msg:"Error: Wrong Username or password !."};


            }
        }).error(function(data, status){

            $scope.messages = {class:"alert alert-danger",msg:"Error: Status code "+status};


        });
    };
    $scope.loadUser=function(){
        $http.get('/loadUser/').success(function(data){
            $scope.users=data;
        })
    }
    $scope.result=false;
    $scope.searchDocument=function(doc){
        $scope.showDocDetails=false;
        $scope.hideDocDetails=false;
        $scope.result=false;
        $scope.message="Searching ..."
        $http.get('/searchDocument/'+doc+'/').success(function(data){
            if (data!=""){
                $scope.result=true;
                $scope.message=""
                //alert(JSON.stringify(data))
                $scope.findDoc=data;
            }else {
                $scope.result=false;
                $scope.message=""
                alert(doc+' not Found in our system!')
            }

        })
    }
    $scope.loadDocType=function(){
        $http.get('/loadDocType/').success(function(data){
            $scope.docTypes=data;
        })
    }
    $scope.loadmsg=function(){
        $http.get('/loadmsg/').success(function(data){
            $scope.masg=data;
        })
    }
    $scope.loadDocument=function(){
        $http.get('/loadDocument/').success(function(data){
            $scope.documents=data;
        })
    }
    $scope.loadDocOnSearch=function(){
        $http.get('/loadDocOnSearch/').success(function(data){
            $scope.documentsearch=data;
        })
    }
    $scope.showFind=function(docType,docNumber){
        $http.get('/findedDoc/'+docType+'/'+docNumber+'/').success(function(data){

        })
        $scope.showDocDetails=true;
        $scope.hideDocDetails=true;
    }
    $scope.activateSubject=function(doc){
        if (doc=='Inyunganizi'){
            $scope.whichSubject=false;
        }else {
            $scope.whichSubject=true;
        }
    }
    $scope.loadCurrentUser=function(){
        $http.get('/loadCurrentUser/').success(function(data){
            $scope.currentUser=data;
        })
    }
    $scope.saveDocument=function(company){

        $http.post('/registerDoc/', company).success(function (data, status, headers, config) {
             if (data=='ok'){
                 $window.location="/documentsp"

             }else if (data=='exist'){
                 $window.location="/documentsp"


             }
        }).error(function(data, status){
            $scope.message = "Error: Status code "+status+".";


        });
    };
    $scope.saveDocument3=function(company){

        $http.post('/registerDoc/', company).success(function (data, status, headers, config) {
             if (data=='ok'){
                 alert('Ibyo muduhaye tubibitse neza Murakoze gukoresha ishakiro.com.');
                 $('#new').modal('hide');
                 $scope.doc={};

             }else if (data==='exist'){
                 $scope.message = company.docNumb+" turayifite !.";


             }
        }).error(function(data, status){
            $scope.message = "Error: Status code "+status+".";


        });
    };
    $scope.saveDocument2=function(company){

        $http.post('/registerDoc2/', company).success(function (data, status, headers, config) {
            if (data==='ok'){
                alert('Ibyo muduhaye tubibitse neza Murakoze gukoresha ishakiro.com.');
               $('#lost').modal('hide');
               $scope.doc={};

            }else if (data==='exist'){
                $scope.message = company.docNumb+" turayifite !.";

            }
        }).error(function(data, status){
            $scope.message = "Error: Status code "+status+".";


        });
    };

    $scope.sendComment=function(){

        $http.post('/sendComment/', $scope.msg).success(function (data, status, headers, config) {
             if (data=='ok'){
                 $scope.message = "Ibazo cyawe cyangwa ikifuzo cyawe cyakiriwe !.";
                 $scope.msg={};
                 $scope.whichSubject=false;
             }
        }).error(function(data, status){
            $scope.message = "Error: Status code "+status+".";


        });
    }
    $scope.deleteMsg=function(a){

        $http.post('/deleteMsg/', a).success(function (data, status, headers, config) {
             if (data=='ok'){
                $window.location="/message"
             }
        }).error(function(data, status){
            $scope.message = "Error: Status code "+status+".";


        });
    }
    $scope.editDocument=function(company){

        $http.post('/editDoc/', company).success(function (data, status, headers, config) {
             if (data=='ok'){
                 $window.location="/documentsp"

             }else if (data=='emailExist'){
                 $scope.message = "Error: Email exist.";


             }else if (data=='phoneExist'){
                 $scope.message = "Error: Phone exist.";


             }
        }).error(function(data, status){
            $scope.message = "Error: Status code "+status+".";


        });
    }
    $scope.deleteDocument=function(company){

        $http.post('/deleteDoc/', company).success(function (data, status, headers, config) {
             if (data=='ok'){
                 $window.location="/documentsp"

             }else if (data=='emailExist'){
                 $scope.message = "Error: Email exist.";


             }else if (data=='phoneExist'){
                 $scope.message = "Error: Phone exist.";


             }
        }).error(function(data, status){
            $scope.message = "Error: Status code "+status+".";


        });
    }
    $scope.registerUser=function(user){
        $scope.message = {class:"alert alert-warning",msg:"Please wait.."};
        $http.post('/registerUser/', user).success(function (data, status, headers, config) {
            if (data=='ok'){
                $window.location="/users"

            }else if (data=='emailExist'){
                $scope.message = {class:"alert alert-danger",msg:"Error: Entered Email exist."};



            }else if (data=='phoneExist'){
                $scope.message = {class:"alert alert-danger",msg:"Error: Entered Phone exist."};
            }
        }).error(function(data, status){
            $scope.message = {class:"alert alert-danger",msg:"Error: Status code "+status+"."};



        });
    }
    $scope.editUser=function(user){
        $scope.message = {class:"alert alert-warning",msg:"Please wait.."};
        $http.post('/editUser/', user).success(function (data, status, headers, config) {
            if (data=='ok'){
                $window.location="/users"

            }else if (data=='emailExist'){
                $scope.message = {class:"alert alert-danger",msg:"Error: Entered Email exist."};



            }else if (data=='phoneExist'){
                $scope.message = {class:"alert alert-danger",msg:"Error: Entered Phone exist."};
            }
        }).error(function(data, status){
            $scope.message = {class:"alert alert-danger",msg:"Error: Status code "+status+"."};



        });
    }
    $scope.deleteUser=function(user){
        $scope.message = {class:"alert alert-warning",msg:"Please wait.."};
        $http.post('/DeleteUser/', user).success(function (data, status, headers, config) {
            if (data=='ok'){
                $window.location="/users"

            }else if (data=='emailExist'){
                $scope.message = {class:"alert alert-danger",msg:"Error: Entered Email exist."};



            }else if (data=='phoneExist'){
                $scope.message = {class:"alert alert-danger",msg:"Error: Entered Phone exist."};
            }
        }).error(function(data, status){
            $scope.message = {class:"alert alert-danger",msg:"Error: Status code "+status+"."};



        });
    }
    $scope.saveDocType=function(doc){

        $http.post('/registerDocType/', doc).success(function (data, status, headers, config) {
            if (data=='ok'){
                $window.location="/docTypep"

            }else if (data=='nameExist'){
                $scope.message = "Error: Entered Name exist.";


            }
        }).error(function(data, status){
            $scope.message = "Error: Status code "+status+".";


        });
    }
    $scope.editDoc=function(doc){

        $http.post('/editDocType/', doc).success(function (data, status, headers, config) {
            if (data=='ok'){
               $window.location="/docTypep"

            }else if (data=='nameExist'){
                $scope.message = "Error: Entered Name exist.";


            }
        }).error(function(data, status){
            $scope.message = "Error: Status code "+status+".";


        });
    }
    $scope.deleteDoc=function(doc){

        $http.post('/deleteDocType/', doc).success(function (data, status, headers, config) {
            if (data=='ok'){
               $window.location="/docTypep"

            }else if (data=='nameExist'){
                $scope.message = "Error: Entered Name exist.";


            }
        }).error(function(data, status){
            $scope.message = "Error: Status code "+status+".";


        });
    }

    $scope.changeOptionDoc=function (doc) {
        if(doc==='National id'){
            $scope.minleg='minlength="16"';
            $scope.maxleg='maxlength="16"';
        }else {
            $scope.minleg='';
            $scope.maxleg='';
        }
    };

    $scope.printDiv = function (divName) {

        var printContents = document.getElementById(divName).innerHTML;
        var originalContents = document.body.innerHTML;

        if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
            var popupWin = window.open('', '_blank', 'width=600,height=600,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
            popupWin.window.focus();
            popupWin.document.write('<!DOCTYPE html><html><head>' +
                '<link rel="stylesheet" media="print" href="/assets/bootstrap/css/bootstrap.css">' +
                '<link rel="stylesheet" media="print" href="/assets/bootstrap/css/bootstrap-theme.css">'+
                '</head><body onload="window.print()"><div class="reward-body">' + printContents + '</div></html>');
            popupWin.onbeforeunload = function (event) {
                popupWin.close();
                return '.\n';
            };
            popupWin.onabort = function (event) {
                popupWin.document.close();
                popupWin.close();
            }
        } else {
            var popupWin = window.open('', '_blank', 'width=800,height=600');
            popupWin.document.open();
            popupWin.document.write('<html><head>' +
                '<link rel="stylesheet" media="print" href="/assets/bootstrap/css/bootstrap.css">' +
            '<link rel="stylesheet" media="print" href="/assets/bootstrap/css/bootstrap-theme.css">' +
                '</head><body onload="window.print()">' + printContents + '</html>');
            popupWin.document.close();
        }
        popupWin.document.close();

        return true;
    }





});





