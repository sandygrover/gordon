@extends('master')

@section('content')
<style>
    .btn-group{
        width:100%!important;
    }
</style>
<?php
    $tags = explode(',',$data->tag);
?>
<div class="content">
    <div class="row">
        <div class="col-lg-8 offset-lg-2">
            <h4 class="page-title">Edit Hospital</h4>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-8 offset-lg-2">
            <form action="{{ route('updatehospital') }}" enctype="multipart/form-data" method="post">
                @csrf
                <div class="row">
                    <input type="hidden" value="{{ $data->id }}" name="id"/>
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label>Name <span class="text-danger">*</span></label>
                            <input class="form-control" value="{{ $data->name }}" name="name" type="text">
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label>Title <span class="text-danger">*</span></label>
                            <input class="form-control" value="{{ $data->title }}"  name="title" type="text">
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <label>Address</label>
                                    <input type="text" value="{{ $data->location }}"  name="location" class="form-control ">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <label>Description</label>
                                    <textarea maxlength="240" type="textarea" name="description" class="form-control ">{{ $data->description }}</textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label>Phone </label>
                            <input class="form-control" value="{{ $data->phone }}"  name="phone" type="text">
                        </div>
                    </div>

                    <div class="col-sm-6">
                        <div class="form-group">
                            <label>Tag </label>
                            <select name="tag[]" data-role="multiselect" class="form-control" multiple required="required">
                                @foreach ($allTahs as $tag)
                                <option <?php if(in_array($tag->id,$tags)) echo "selected"; ?> value="{{ $tag->id }}">{{ $tag->name }}</option>
                                @endforeach
                            </select>
                        </div>
                    </div>

                    <style>
                        .dropdown-check-list {
                            display: inline-block;
                        }

                        .dropdown-check-list .anchor {
                            position: relative;
                            cursor: pointer;
                            display: inline-block;
                            padding: 5px 50px 5px 10px;
                            border: 1px solid #ccc;
                        }

                        .dropdown-check-list .anchor:after {
                            position: absolute;
                            content: "";
                            border-left: 2px solid black;
                            border-top: 2px solid black;
                            padding: 5px;
                            right: 10px;
                            top: 20%;
                            -moz-transform: rotate(-135deg);
                            -ms-transform: rotate(-135deg);
                            -o-transform: rotate(-135deg);
                            -webkit-transform: rotate(-135deg);
                            transform: rotate(-135deg);
                        }

                        .dropdown-check-list .anchor:active:after {
                            right: 8px;
                            top: 21%;
                        }

                        .dropdown-check-list ul.items {
                            padding: 2px;
                            display: none;
                            margin: 0;
                            border: 1px solid #ccc;
                            border-top: none;
                        }

                        .dropdown-check-list ul.items li {
                            list-style: none;
                        }

                        .dropdown-check-list.visible .anchor {
                            color: #0094ff;
                        }

                        .dropdown-check-list.visible .items {
                            display: block;
                        }
                    </style>

                    <div id="list1" class="dropdown-check-list col-sm-6 visible" tabindex="100">
                        <span class="anchor" style="width: 100%;">Select Department</span>
                        <ul class="items">
                            @foreach ($allDepartment as $value)
                            <li><input <?php if(in_array($value->id,$all_selected_department)) echo 'checked'; ?> type="checkbox" class="checkbox1" id="department_{{ $value->id }}" name="department[]" value="{{ $value->id }}">{{ $value->title }} </li>
                            @endforeach
                        </ul>
                    </div><br>

                    <script>
                        var checkList = document.getElementById('list1');
                        checkList.getElementsByClassName('anchor')[0].onclick = function(evt) {
                        if (checkList.classList.contains('visible'))
                            checkList.classList.remove('visible');
                        else
                            checkList.classList.add('visible');
                        }
                    </script>


                    <div id="row_div" style="width: 100%;padding-top:14px;">
                        @foreach ($relationship_data as $rel)
                        <div id="department_{{ $rel->department_id }}_div" class="row col-sm-12">
                            <div class="col-sm-6">
                                <label for="vehicle1">Select Department</label>
                                <select class="form-control" data-role="multiselect" name="doctor{{$rel->department_id}}[]" multiple>
                                @foreach ($allDoctor as $value1)
                                <option <?php if(in_array($value1->id, json_decode($rel->doctors_id))) echo 'selected'; ?> value="{{ $value1->id }}">{{ $value1->first_name }}</option>
                                @endforeach
                                </select>
                            </div>
                            <div class="col-sm-6">
                                <label for="vehicle1">Select Facility</label>
                                <select data-role="multiselect" class="form-control" name="facility{{$rel->department_id}}[]" multiple>
                                @foreach ($allFacility as $value2)
                                <option <?php if(in_array($value2->id, json_decode($rel->facilitties_id))) echo 'selected'; ?> value="{{ $value2->id }}">{{ $value2->title }}</option>
                                @endforeach
                                </select>
                            </div>
                        </div>
                        @endforeach
                    </div>

                    <div id="alldoctor_div">
                        @foreach ($allDoctor as $value1)
                        <option value="{{ $value1->id }}">{{ $value1->first_name }}</option>
                        @endforeach
                    </div>
                    <div id="allfacility_div">
                        @foreach ($allFacility as $value2)
                        <option value="{{ $value2->id }}">{{ $value2->title }}</option>
                        @endforeach
                    </div>


                    <div class="col-sm-6">
                        <div class="form-group">
                            <label>Avatar</label>
                            <div class="profile-upload">
                                <div class="upload-img">
                                    <img alt="" src="{{ url('images').'/'.$data->image }}">
                                </div>
                                <div class="upload-input">
                                    <input name="image" type="file" class="form-control">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="m-t-20 text-center">
                    <button class="btn btn-primary submit-btn">Save</button>
                </div>
            </form>
        </div>
    </div>
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
