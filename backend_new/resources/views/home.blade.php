{{-- @extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Dashboard') }}</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif

                    {{ __('You are logged in!') }}
                </div>
            </div>
        </div>
    </div>
</div>
@endsection --}}

@extends('master')

@section('content')
<div class="content">
    <div class="row">
        <div class="col-md-6 col-sm-6 col-lg-6 col-xl-3">
            <div class="dash-widget">
                <span class="dash-widget-bg1"><i class="fa fa-users"></i></span>
                <div class="dash-widget-info text-right">
                    <h3>{{$userCount}}</h3>
                    <span class="widget-title1">User <i class="fa fa-check" aria-hidden="true"></i></span>
                </div>
            </div>
        </div>

        <div class="col-md-6 col-sm-6 col-lg-6 col-xl-3">
            <div class="dash-widget">
                <span class="dash-widget-bg1"><i class="fa fa-users"></i></span>
                <div class="dash-widget-info text-right">
                    <h3>{{$contestCount}}</h3>
                    <span class="widget-title1">Contest <i class="fa fa-check" aria-hidden="true"></i></span>
                </div>
            </div>
        </div>

        <div class="col-md-6 col-sm-6 col-lg-6 col-xl-3">
            <div class="dash-widget">
                <span class="dash-widget-bg1"><i class="fa fa-users" aria-hidden="true"></i></span>
                <div class="dash-widget-info text-right">
                    <h3>{{$contestCategoryCount}}</h3>
                    <span class="widget-title1">Contest Categpry <i class="fa fa-check" aria-hidden="true"></i></span>
                </div>
            </div>
        </div>

        {{-- <div class="col-md-6 col-sm-6 col-lg-6 col-xl-3">
            <div class="dash-widget">
                <span class="dash-widget-bg2"><i class="fa fa-user-o"></i></span>
                <div class="dash-widget-info text-right">
                    <h3>{{$DepartmentCount}}</h3>
                    <span class="widget-title2">Department <i class="fa fa-check" aria-hidden="true"></i></span>
                </div>
            </div>
        </div>
        <div class="col-md-6 col-sm-6 col-lg-6 col-xl-3">
            <div class="dash-widget">
                <span class="dash-widget-bg3"><i class="fa fa-user-md" aria-hidden="true"></i></span>
                <div class="dash-widget-info text-right">
                    <h3>{{$FacilityCount}}</h3>
                    <span class="widget-title3">Facility <i class="fa fa-check" aria-hidden="true"></i></span>
                </div>
            </div>
        </div>
        <div class="col-md-6 col-sm-6 col-lg-6 col-xl-3">
            <div class="dash-widget">
                <span class="dash-widget-bg4"><i class="fa fa-heartbeat" aria-hidden="true"></i></span>
                <div class="dash-widget-info text-right">
                    <h3>{{$HospitalCount}}</h3>
                    <span class="widget-title4">Hospital <i class="fa fa-check" aria-hidden="true"></i></span>
                </div>
            </div>
        </div> --}}
    </div>
    <div class="row">
        <div class="col-12 col-md-6 col-lg-6 col-xl-6">
            <div class="card">
                <div class="card-body">
                    <div class="chart-title">
                        <h4>Users</h4>
                        <span class="float-right"></span>
                    </div>
                    <canvas id="linegraph"></canvas>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-12 col-md-6 col-lg-12 col-xl-12">
            <div class="card">
                <div class="card-header">
                    <h4 class="card-title d-inline-block">User List</h4>
                    <a href="{{ route('exportExcel') }}" class="btn btn-primary float-right">Export Excel</a>
                    <a style="margin-right:10px;" href="{{ route('exportCSV') }}" class="btn btn-primary float-right">Export CSV</a>
                </div>
                    <div class="table-responsive">
                        <table class="table table-border table-striped custom-table mb-0">
                            <thead>
                                <tr>
                                    <th>User Name</th>
                                    <th>Last Name</th>
                                    <th>Phone</th>
                                    <th>Email</th>
                                    <th>Provider</th>
                                    <!--<th>Timing</th>-->
                                    <!--<th class="text-right">Status</th>-->
                                </tr>
                            </thead>
                            <tbody>
                                @foreach($userList as $value)
                                <tr>
                                    <td style="min-width: 200px;">
                                        <a class="avatar" href="#">{{ $value->username[0] }}</a>
                                        <h2><a href="#">{{ $value->username }}</span></a></h2>
                                    </td>
                                    <td>
                                        <p>{{ $value->last_name }}</p>
                                    </td>
                                    <td>
                                        <p>{{ $value->phone_number }}</p>
                                    </td>
                                    <td>
                                        <p>{{ $value->email }}</p>
                                    </td>
                                    <td>
                                        <p>{{ is_null($value->provider) ? 'Manual' : $value->provider }}</p>
                                    </td>
                                    <!--<td>-->
                                    <!--    <h5 class="time-title p-0">Timing</h5>-->
                                    <!--    <p>7.00 PM</p>-->
                                    <!--</td>-->
                                    <!--<td class="text-right">-->
                                    <!--    <a href="appointments.html" class="btn btn-outline-primary take-btn">Take up</a>-->
                                    <!--</td>-->
                                </tr>
                                @endforeach
                                <!--<tr>-->
                                <!--    <td style="min-width: 200px;">-->
                                <!--        <a class="avatar" href="profile.html">B</a>-->
                                <!--        <h2><a href="profile.html">Bernardo Galaviz <span>New York, USA</span></a></h2>-->
                                <!--    </td>-->
                                <!--    <td>-->
                                <!--        <h5 class="time-title p-0">Appointment With</h5>-->
                                <!--        <p>Dr. Cristina Groves</p>-->
                                <!--    </td>-->
                                <!--    <td>-->
                                <!--        <h5 class="time-title p-0">Timing</h5>-->
                                <!--        <p>7.00 PM</p>-->
                                <!--    </td>-->
                                <!--    <td class="text-right">-->
                                <!--        <a href="appointments.html" class="btn btn-outline-primary take-btn">Take up</a>-->
                                <!--    </td>-->
                                <!--</tr>-->
                                <!--<tr>-->
                                <!--    <td style="min-width: 200px;">-->
                                <!--        <a class="avatar" href="profile.html">B</a>-->
                                <!--        <h2><a href="profile.html">Bernardo Galaviz <span>New York, USA</span></a></h2>-->
                                <!--    </td>-->
                                <!--    <td>-->
                                <!--        <h5 class="time-title p-0">Appointment With</h5>-->
                                <!--        <p>Dr. Cristina Groves</p>-->
                                <!--    </td>-->
                                <!--    <td>-->
                                <!--        <h5 class="time-title p-0">Timing</h5>-->
                                <!--        <p>7.00 PM</p>-->
                                <!--    </td>-->
                                <!--    <td class="text-right">-->
                                <!--        <a href="appointments.html" class="btn btn-outline-primary take-btn">Take up</a>-->
                                <!--    </td>-->
                                <!--</tr>-->
                                <!--<tr>-->
                                <!--    <td style="min-width: 200px;">-->
                                <!--        <a class="avatar" href="profile.html">B</a>-->
                                <!--        <h2><a href="profile.html">Bernardo Galaviz <span>New York, USA</span></a></h2>-->
                                <!--    </td>-->
                                <!--    <td>-->
                                <!--        <h5 class="time-title p-0">Appointment With</h5>-->
                                <!--        <p>Dr. Cristina Groves</p>-->
                                <!--    </td>-->
                                <!--    <td>-->
                                <!--        <h5 class="time-title p-0">Timing</h5>-->
                                <!--        <p>7.00 PM</p>-->
                                <!--    </td>-->
                                <!--    <td class="text-right">-->
                                <!--        <a href="appointments.html" class="btn btn-outline-primary take-btn">Take up</a>-->
                                <!--    </td>-->
                                <!--</tr>-->
                                <!--<tr>-->
                                <!--    <td style="min-width: 200px;">-->
                                <!--        <a class="avatar" href="profile.html">B</a>-->
                                <!--        <h2><a href="profile.html">Bernardo Galaviz <span>New York, USA</span></a></h2>-->
                                <!--    </td>-->
                                <!--    <td>-->
                                <!--        <h5 class="time-title p-0">Appointment With</h5>-->
                                <!--        <p>Dr. Cristina Groves</p>-->
                                <!--    </td>-->
                                <!--    <td>-->
                                <!--        <h5 class="time-title p-0">Timing</h5>-->
                                <!--        <p>7.00 PM</p>-->
                                <!--    </td>-->
                                <!--    <td class="text-right">-->
                                <!--        <a href="appointments.html" class="btn btn-outline-primary take-btn">Take up</a>-->
                                <!--    </td>-->
                                <!--</tr>-->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        {{-- <div class="col-12 col-md-6 col-lg-4 col-xl-4">
            <div class="card member-panel">
                <div class="card-header bg-white">
                    <h4 class="card-title mb-0">Doctors</h4>
                </div>
                <div class="card-body">
                    <ul class="contact-list">
                        @foreach($doctorList as $value)
                        <li>
                            <div class="contact-cont">
                                <div class="float-left user-img m-r-10">
                                    <a href="#" title="John Doe"><img src="{{ url('images').'/'.$value->image }}" alt="" class="w-40 rounded-circle"><span class="status online"></span></a>
                                </div>
                                <div class="contact-info">
                                    <span class="contact-name text-ellipsis">{{$value->first_name.' '.$value->last_name}}</span>
                                    <span class="contact-date">{{ $value->specialization }}</span>
                                </div>
                            </div>
                        </li>
                        @endforeach

                        <!--<li>-->
                        <!--    <div class="contact-cont">-->
                        <!--        <div class="float-left user-img m-r-10">-->
                        <!--            <a href="profile.html" title="Richard Miles"><img src="assets/img/user.jpg" alt="" class="w-40 rounded-circle"><span class="status offline"></span></a>-->
                        <!--        </div>-->
                        <!--        <div class="contact-info">-->
                        <!--            <span class="contact-name text-ellipsis">Richard Miles</span>-->
                        <!--            <span class="contact-date">MD</span>-->
                        <!--        </div>-->
                        <!--    </div>-->
                        <!--</li>-->
                        <!--<li>-->
                        <!--    <div class="contact-cont">-->
                        <!--        <div class="float-left user-img m-r-10">-->
                        <!--            <a href="profile.html" title="John Doe"><img src="assets/img/user.jpg" alt="" class="w-40 rounded-circle"><span class="status away"></span></a>-->
                        <!--        </div>-->
                        <!--        <div class="contact-info">-->
                        <!--            <span class="contact-name text-ellipsis">John Doe</span>-->
                        <!--            <span class="contact-date">BMBS</span>-->
                        <!--        </div>-->
                        <!--    </div>-->
                        <!--</li>-->
                        <!--<li>-->
                        <!--    <div class="contact-cont">-->
                        <!--        <div class="float-left user-img m-r-10">-->
                        <!--            <a href="profile.html" title="Richard Miles"><img src="assets/img/user.jpg" alt="" class="w-40 rounded-circle"><span class="status online"></span></a>-->
                        <!--        </div>-->
                        <!--        <div class="contact-info">-->
                        <!--            <span class="contact-name text-ellipsis">Richard Miles</span>-->
                        <!--            <span class="contact-date">MS, MD</span>-->
                        <!--        </div>-->
                        <!--    </div>-->
                        <!--</li>-->
                        <!--<li>-->
                        <!--    <div class="contact-cont">-->
                        <!--        <div class="float-left user-img m-r-10">-->
                        <!--            <a href="profile.html" title="John Doe"><img src="assets/img/user.jpg" alt="" class="w-40 rounded-circle"><span class="status offline"></span></a>-->
                        <!--        </div>-->
                        <!--        <div class="contact-info">-->
                        <!--            <span class="contact-name text-ellipsis">John Doe</span>-->
                        <!--            <span class="contact-date">MBBS</span>-->
                        <!--        </div>-->
                        <!--    </div>-->
                        <!--</li>-->
                        <!--<li>-->
                        <!--    <div class="contact-cont">-->
                        <!--        <div class="float-left user-img m-r-10">-->
                        <!--            <a href="profile.html" title="Richard Miles"><img src="assets/img/user.jpg" alt="" class="w-40 rounded-circle"><span class="status away"></span></a>-->
                        <!--        </div>-->
                        <!--        <div class="contact-info">-->
                        <!--            <span class="contact-name text-ellipsis">Richard Miles</span>-->
                        <!--            <span class="contact-date">MBBS, MD</span>-->
                        <!--        </div>-->
                        <!--    </div>-->
                        <!--</li>-->
                    </ul>
                </div>
                <!--<div class="card-footer text-center bg-white">-->
                <!--    <a href="doctors.html" class="text-muted">View all Doctors</a>-->
                <!--</div>-->
            </div>
        </div> --}}
    </div>
    <!--<div class="row">-->
    <!--    <div class="col-12 col-md-6 col-lg-8 col-xl-8">-->
    <!--        <div class="card">-->
    <!--            <div class="card-header">-->
    <!--                <h4 class="card-title d-inline-block">New Patients </h4> <a href="patients.html" class="btn btn-primary float-right">View all</a>-->
    <!--            </div>-->
    <!--            <div class="card-block">-->
    <!--                <div class="table-responsive">-->
    <!--                    <table class="table mb-0 new-patient-table">-->
    <!--                        <tbody>-->
    <!--                            <tr>-->
    <!--                                <td>-->
    <!--                                    <img width="28" height="28" class="rounded-circle" src="assets/img/user.jpg" alt="">-->
    <!--                                    <h2>John Doe</h2>-->
    <!--                                </td>-->
    <!--                                <td>Johndoe21@gmail.com</td>-->
    <!--                                <td>+1-202-555-0125</td>-->
    <!--                                <td><button class="btn btn-primary btn-primary-one float-right">Fever</button></td>-->
    <!--                            </tr>-->
    <!--                            <tr>-->
    <!--                                <td>-->
    <!--                                    <img width="28" height="28" class="rounded-circle" src="assets/img/user.jpg" alt="">-->
    <!--                                    <h2>Richard</h2>-->
    <!--                                </td>-->
    <!--                                <td>Richard123@yahoo.com</td>-->
    <!--                                <td>202-555-0127</td>-->
    <!--                                <td><button class="btn btn-primary btn-primary-two float-right">Cancer</button></td>-->
    <!--                            </tr>-->
    <!--                            <tr>-->
    <!--                                <td>-->
    <!--                                    <img width="28" height="28" class="rounded-circle" src="assets/img/user.jpg" alt="">-->
    <!--                                    <h2>Villiam</h2>-->
    <!--                                </td>-->
    <!--                                <td>Richard123@yahoo.com</td>-->
    <!--                                <td>+1-202-555-0106</td>-->
    <!--                                <td><button class="btn btn-primary btn-primary-three float-right">Eye</button></td>-->
    <!--                            </tr>-->
    <!--                            <tr>-->
    <!--                                <td>-->
    <!--                                    <img width="28" height="28" class="rounded-circle" src="assets/img/user.jpg" alt="">-->
    <!--                                    <h2>Martin</h2>-->
    <!--                                </td>-->
    <!--                                <td>Richard123@yahoo.com</td>-->
    <!--                                <td>776-2323 89562015</td>-->
    <!--                                <td><button class="btn btn-primary btn-primary-four float-right">Fever</button></td>-->
    <!--                            </tr>-->
    <!--                        </tbody>-->
    <!--                    </table>-->
    <!--                </div>-->
    <!--            </div>-->
    <!--        </div>-->
    <!--    </div>-->
    <!--    <div class="col-12 col-md-6 col-lg-4 col-xl-4">-->
    <!--        <div class="hospital-barchart">-->
    <!--            <h4 class="card-title d-inline-block">Hospital Management</h4>-->
    <!--        </div>-->
    <!--        <div class="bar-chart">-->
    <!--            <div class="legend">-->
    <!--                <div class="item">-->
    <!--                    <h4>Level1</h4>-->
    <!--                </div>-->

    <!--                <div class="item">-->
    <!--                    <h4>Level2</h4>-->
    <!--                </div>-->
    <!--                <div class="item text-right">-->
    <!--                    <h4>Level3</h4>-->
    <!--                </div>-->
    <!--                <div class="item text-right">-->
    <!--                    <h4>Level4</h4>-->
    <!--                </div>-->
    <!--            </div>-->
    <!--            <div class="chart clearfix">-->
    <!--                <div class="item">-->
    <!--                    <div class="bar">-->
    <!--                        <span class="percent">16%</span>-->
    <!--                        <div class="item-progress" data-percent="16">-->
    <!--                            <span class="title">OPD Patient</span>-->
    <!--                        </div>-->
    <!--                    </div>-->
    <!--                </div>-->
    <!--                <div class="item">-->
    <!--                    <div class="bar">-->
    <!--                        <span class="percent">71%</span>-->
    <!--                        <div class="item-progress" data-percent="71">-->
    <!--                            <span class="title">New Patient</span>-->
    <!--                        </div>-->
    <!--                    </div>-->
    <!--                </div>-->
    <!--                <div class="item">-->
    <!--                    <div class="bar">-->
    <!--                        <span class="percent">82%</span>-->
    <!--                        <div class="item-progress" data-percent="82">-->
    <!--                            <span class="title">Laboratory Test</span>-->
    <!--                        </div>-->
    <!--                    </div>-->
    <!--                </div>-->
    <!--                <div class="item">-->
    <!--                    <div class="bar">-->
    <!--                        <span class="percent">67%</span>-->
    <!--                        <div class="item-progress" data-percent="67">-->
    <!--                            <span class="title">Treatment</span>-->
    <!--                        </div>-->
    <!--                    </div>-->
    <!--                </div>-->
    <!--                <div class="item">-->
    <!--                    <div class="bar">-->
    <!--                        <span class="percent">30%</span>-->
    <!--                        <div class="item-progress" data-percent="30">-->
    <!--                            <span class="title">Discharge</span>-->
    <!--                        </div>-->
    <!--                    </div>-->
    <!--                </div>-->
    <!--            </div>-->
    <!--        </div>-->
    <!--     </div>-->
    <!--</div>-->
</div>
<div class="notification-box">
    <div class="msg-sidebar notifications msg-noti">
        <div class="topnav-dropdown-header">
            <span>Messages</span>
        </div>
        <div class="drop-scroll msg-list-scroll" id="msg_list">
            <ul class="list-box">
                <li>
                    <a href="chat.html">
                        <div class="list-item">
                            <div class="list-left">
                                <span class="avatar">R</span>
                            </div>
                            <div class="list-body">
                                <span class="message-author">Richard Miles </span>
                                <span class="message-time">12:28 AM</span>
                                <div class="clearfix"></div>
                                <span class="message-content">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
                            </div>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="chat.html">
                        <div class="list-item new-message">
                            <div class="list-left">
                                <span class="avatar">J</span>
                            </div>
                            <div class="list-body">
                                <span class="message-author">John Doe</span>
                                <span class="message-time">1 Aug</span>
                                <div class="clearfix"></div>
                                <span class="message-content">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
                            </div>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="chat.html">
                        <div class="list-item">
                            <div class="list-left">
                                <span class="avatar">T</span>
                            </div>
                            <div class="list-body">
                                <span class="message-author"> Tarah Shropshire </span>
                                <span class="message-time">12:28 AM</span>
                                <div class="clearfix"></div>
                                <span class="message-content">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
                            </div>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="chat.html">
                        <div class="list-item">
                            <div class="list-left">
                                <span class="avatar">M</span>
                            </div>
                            <div class="list-body">
                                <span class="message-author">Mike Litorus</span>
                                <span class="message-time">12:28 AM</span>
                                <div class="clearfix"></div>
                                <span class="message-content">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
                            </div>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="chat.html">
                        <div class="list-item">
                            <div class="list-left">
                                <span class="avatar">C</span>
                            </div>
                            <div class="list-body">
                                <span class="message-author"> Catherine Manseau </span>
                                <span class="message-time">12:28 AM</span>
                                <div class="clearfix"></div>
                                <span class="message-content">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
                            </div>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="chat.html">
                        <div class="list-item">
                            <div class="list-left">
                                <span class="avatar">D</span>
                            </div>
                            <div class="list-body">
                                <span class="message-author"> Domenic Houston </span>
                                <span class="message-time">12:28 AM</span>
                                <div class="clearfix"></div>
                                <span class="message-content">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
                            </div>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="chat.html">
                        <div class="list-item">
                            <div class="list-left">
                                <span class="avatar">B</span>
                            </div>
                            <div class="list-body">
                                <span class="message-author"> Buster Wigton </span>
                                <span class="message-time">12:28 AM</span>
                                <div class="clearfix"></div>
                                <span class="message-content">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
                            </div>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="chat.html">
                        <div class="list-item">
                            <div class="list-left">
                                <span class="avatar">R</span>
                            </div>
                            <div class="list-body">
                                <span class="message-author"> Rolland Webber </span>
                                <span class="message-time">12:28 AM</span>
                                <div class="clearfix"></div>
                                <span class="message-content">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
                            </div>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="chat.html">
                        <div class="list-item">
                            <div class="list-left">
                                <span class="avatar">C</span>
                            </div>
                            <div class="list-body">
                                <span class="message-author"> Claire Mapes </span>
                                <span class="message-time">12:28 AM</span>
                                <div class="clearfix"></div>
                                <span class="message-content">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
                            </div>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="chat.html">
                        <div class="list-item">
                            <div class="list-left">
                                <span class="avatar">M</span>
                            </div>
                            <div class="list-body">
                                <span class="message-author">Melita Faucher</span>
                                <span class="message-time">12:28 AM</span>
                                <div class="clearfix"></div>
                                <span class="message-content">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
                            </div>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="chat.html">
                        <div class="list-item">
                            <div class="list-left">
                                <span class="avatar">J</span>
                            </div>
                            <div class="list-body">
                                <span class="message-author">Jeffery Lalor</span>
                                <span class="message-time">12:28 AM</span>
                                <div class="clearfix"></div>
                                <span class="message-content">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
                            </div>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="chat.html">
                        <div class="list-item">
                            <div class="list-left">
                                <span class="avatar">L</span>
                            </div>
                            <div class="list-body">
                                <span class="message-author">Loren Gatlin</span>
                                <span class="message-time">12:28 AM</span>
                                <div class="clearfix"></div>
                                <span class="message-content">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
                            </div>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="chat.html">
                        <div class="list-item">
                            <div class="list-left">
                                <span class="avatar">T</span>
                            </div>
                            <div class="list-body">
                                <span class="message-author">Tarah Shropshire</span>
                                <span class="message-time">12:28 AM</span>
                                <div class="clearfix"></div>
                                <span class="message-content">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
                            </div>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
        <div class="topnav-dropdown-footer">
            <a href="chat.html">See all messages</a>
        </div>
    </div>
</div>
@endsection

