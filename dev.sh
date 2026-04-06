#!/bin/bash

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BOLD='\033[1m'
DIM='\033[2m'
NC='\033[0m'

WORKSPACE_DIR="$(cd "$(dirname "$0")" && pwd)"

# ─── Arrow-key menu selector ───────────────────────────
# Usage: menu_select result_var "Title" "option1" "option2" ...
menu_select() {
  local result_var=$1
  local title=$2
  shift 2
  local options=("$@")
  local count=${#options[@]}
  local selected=0

  # Hide cursor
  tput civis

  echo -e "\n  ${BOLD}${title}${NC}\n"

  # Draw initial menu
  for i in "${!options[@]}"; do
    if [ $i -eq $selected ]; then
      echo -e "  ${CYAN}❯${NC} ${BOLD}${options[$i]}${NC}"
    else
      echo -e "    ${DIM}${options[$i]}${NC}"
    fi
  done

  echo -e "\n  ${DIM}↑/↓ to move, Enter to select${NC}"

  # Read arrow keys and enter
  while true; do
    read -rsn1 key
    if [[ $key == $'\x1b' ]]; then
      read -rsn2 key
      case $key in
        '[A') # Up arrow
          ((selected--))
          [ $selected -lt 0 ] && selected=$((count - 1))
          ;;
        '[B') # Down arrow
          ((selected++))
          [ $selected -ge $count ] && selected=0
          ;;
      esac
    elif [[ $key == "" ]]; then
      # Enter pressed
      break
    fi

    # Redraw menu (move cursor up to overwrite)
    tput cuu $((count + 2))
    tput el
    for i in "${!options[@]}"; do
      tput el
      if [ $i -eq $selected ]; then
        echo -e "  ${CYAN}❯${NC} ${BOLD}${options[$i]}${NC}"
      else
        echo -e "    ${DIM}${options[$i]}${NC}"
      fi
    done
    tput el
    echo -e "\n  ${DIM}↑/↓ to move, Enter to select${NC}"
  done

  # Show cursor
  tput cnorm

  # Clear the menu lines
  tput cuu $((count + 3))
  for ((i = 0; i <= count + 3; i++)); do
    tput el
    tput cud1
  done
  tput cuu $((count + 4))

  echo -e "  ${GREEN}✔${NC} ${BOLD}${title}${NC} → ${CYAN}${options[$selected]}${NC}"

  eval "$result_var=$selected"
}

print_banner() {
  clear
  echo -e "${CYAN}"
  echo "  ╔══════════════════════════════════════╗"
  echo "  ║       Arshdeep's Dev Workspace       ║"
  echo "  ╚══════════════════════════════════════╝"
  echo -e "${NC}"
}

select_project() {
  echo -e "\n  ${BOLD}Select project:${NC}\n"
  echo -e "  ${CYAN}1)${NC} Portfolio"
  echo -e "  ${CYAN}2)${NC} Studio"
  echo -e "  ${CYAN}3)${NC} Links"
  echo -e "  ${CYAN}4)${NC} Blogs"
  echo -e "\n  ${DIM}Enter your choice (1-4):${NC} "
  
  read -r choice
  
  case $choice in
    1) echo "portfolio" ;;
    2) echo "studio" ;;
    3) echo "links" ;;
    4) echo "blogs" ;;
    *) 
      echo -e "  ${RED}Invalid choice. Defaulting to portfolio.${NC}"
      echo "portfolio" 
      ;;
  esac
}

serve_project() {
  local project
  project=$(select_project)
  
  echo "DEBUG: Selected project is: $project"
  
  local port=4200
  [ "$project" = "studio" ] && port=4300
  [ "$project" = "links" ] && port=4400
  [ "$project" = "blogs" ] && port=4500

  echo -e "\n  ${GREEN}▶ Serving ${BOLD}$project${NC}${GREEN} on http://localhost:$port${NC}\n"
  cd "$WORKSPACE_DIR" && npx ng serve "$project" --port "$port" --open
}

build_project() {
  local project
  project=$(select_project)

  echo -e "\n  ${BOLD}Build configuration:${NC}\n"
  echo -e "  ${CYAN}1)${NC} Production"
  echo -e "  ${CYAN}2)${NC} Development"
  echo -e "\n  ${DIM}Enter your choice (1-2):${NC} "
  
  read -r config_choice
  
  local config="production"
  [ "$config_choice" = "2" ] && config="development"

  echo -e "\n  ${GREEN}▶ Building ${BOLD}$project${NC}${GREEN} ($config)...${NC}\n"
  cd "$WORKSPACE_DIR" && npx ng build "$project" --configuration "$config"

  if [ $? -eq 0 ]; then
    echo -e "\n  ${GREEN}✔ Build successful! Output: dist/$project${NC}"
  else
    echo -e "\n  ${RED}✖ Build failed.${NC}"
  fi
}

build_all() {
  echo -e "\n  ${GREEN}▶ Building all projects...${NC}\n"
  cd "$WORKSPACE_DIR" || exit

  echo -e "  ${CYAN}[1/4]${NC} Building portfolio..."
  npx ng build portfolio
  local p_status=$?

  echo -e "\n  ${CYAN}[2/4]${NC} Building studio..."
  npx ng build studio
  local s_status=$?

  echo -e "\n  ${CYAN}[3/4]${NC} Building links..."
  npx ng build links
  local l_status=$?

  echo -e "\n  ${CYAN}[4/4]${NC} Building blogs..."
  npx ng build blogs
  local b_status=$?

  echo ""
  if [ $p_status -eq 0 ] && [ $s_status -eq 0 ] && [ $l_status -eq 0 ] && [ $b_status -eq 0 ]; then
    echo -e "  ${GREEN}✔ All projects built successfully!${NC}"
  else
    [ $p_status -ne 0 ] && echo -e "  ${RED}✖ Portfolio build failed.${NC}"
    [ $s_status -ne 0 ] && echo -e "  ${RED}✖ Studio build failed.${NC}"
    [ $l_status -ne 0 ] && echo -e "  ${RED}✖ Links build failed.${NC}"
    [ $b_status -ne 0 ] && echo -e "  ${RED}✖ Blogs build failed.${NC}"
  fi
}

serve_all() {
  echo -e "\n  ${GREEN}▶ Serving all projects...${NC}"
  echo -e "  ${CYAN}Portfolio${NC} → http://localhost:4200"
  echo -e "  ${CYAN}Studio${NC}    → http://localhost:4300"
  echo -e "  ${CYAN}Links${NC}     → http://localhost:4400"
  echo -e "  ${CYAN}Blogs${NC}     → http://localhost:4500\n"

  cd "$WORKSPACE_DIR" || exit
  npx ng serve portfolio --port 4200 &
  local pid1=$!
  npx ng serve studio --port 4300 &
  local pid2=$!
  npx ng serve links --port 4400 &
  local pid3=$!
  npx ng serve blogs --port 4500 &
  local pid4=$!

  echo -e "\n  ${YELLOW}Press Ctrl+C to stop all servers.${NC}\n"
  trap "kill $pid1 $pid2 $pid3 $pid4 2>/dev/null; echo -e '\n  ${RED}Servers stopped.${NC}'; exit" INT
  wait $pid1 $pid2 $pid3 $pid4
}

install_deps() {
  echo -e "\n  ${GREEN}▶ Installing dependencies...${NC}\n"
  cd "$WORKSPACE_DIR" && npm install
}

clean_install() {
  echo -e "\n  ${YELLOW}▶ Removing node_modules and package-lock.json...${NC}\n"
  cd "$WORKSPACE_DIR" || exit
  rm -rf node_modules package-lock.json

  echo -e "  ${GREEN}▶ Reinstalling dependencies...${NC}\n"
  npm install

  if [ $? -eq 0 ]; then
    echo -e "\n  ${GREEN}✔ Clean install complete!${NC}"
  else
    echo -e "\n  ${RED}✖ Install failed.${NC}"
  fi
}

run_tests() {
  local project
  project=$(select_project)

  echo -e "\n  ${GREEN}▶ Running tests for ${BOLD}$project${NC}${GREEN}...${NC}\n"
  cd "$WORKSPACE_DIR" && npx ng test "$project"
}

clean_dist() {
  echo -e "\n  ${YELLOW}▶ Cleaning build output...${NC}"
  cd "$WORKSPACE_DIR" && rm -rf dist out-tsc
  echo -e "  ${GREEN}✔ Cleaned dist/ and out-tsc/${NC}"
}

# ─── Main Loop ──────────────────────────────────────────

MAIN_OPTIONS=(
  "🚀 Serve a project"
  "📦 Build a project"
  "📦 Build all projects"
  "🚀 Serve all projects"
  "📥 Install dependencies"
  "🧹 Clean & reinstall deps"
  "🧪 Run tests"
  "🗑️  Clean build output"
  "👋 Exit"
)

while true; do
  print_banner

  local_choice=0
  menu_select local_choice "What would you like to do?" "${MAIN_OPTIONS[@]}"

  case $local_choice in
    0) serve_project ;;
    1) build_project ;;
    2) build_all ;;
    3) serve_all ;;
    4) install_deps ;;
    5) clean_install ;;
    6) run_tests ;;
    7) clean_dist ;;
    8)
      echo -e "\n  ${CYAN}Bye! 👋${NC}\n"
      exit 0
      ;;
  esac

  if [ "$local_choice" != "0" ] && [ "$local_choice" != "3" ]; then
    echo ""
    read -rp "  Press Enter to continue..." _
  fi
done
