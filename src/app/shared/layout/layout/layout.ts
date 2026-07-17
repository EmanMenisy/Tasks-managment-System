import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { NavBar } from "../../components/nav-bar/nav-bar";
import { Sidebar } from '../../components/sidebar/components/sidebar';

@Component({
  standalone :true,
  selector: 'app-layout',
  imports: [Sidebar, RouterOutlet, NavBar],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {}
